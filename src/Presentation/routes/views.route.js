import { Router } from 'express'
import CartMongooseManager from '../../Infrastructure/dao/managers/CartMongooseManager.js'
// import ProductManager from '../dao/managers/ProductManager.js'
import ProductMongooseManager from '../../Infrastructure/dao/managers/ProductMongooseManager.js'

const router = Router()

const auth = (req, res, next) => {
    if (req.session.user) {
        return next()
    }

    if (req.route.path === '/') {
        res.redirect('/login')
    }

    return res.status(401).json({"Error": 'Acceso no permitido'})
}

router.get('/', async(req, res) => {
    if (req.session.user) {
        return res.redirect('/products')
    }

    return res.redirect('/login')
})

router.get('/products', async(req, res) => {
    const parameters = req.query
    console.log(req.session)

    if (parameters.page) {
        if (isNaN(parameters.page) || (parseInt(parameters.page) < 1)) {
            return res.status(400).json({status : 'error'})
        }
    }

    const searchCriterial = {}
    if (parameters.query) {
        searchCriterial = isNaN(parameters.query) ? {category: parameters.query} : {stock: category}
    }

    const optionsPagination = {
        limit: parameters.limit ?? 10,
        page: parameters.page ?? 1
    }

    if (parameters.sort) {
        optionsPagination.sort = parameters.sort === 'asc' ? {price: 1} : {price: -1}
    }
        
    const products = await ProductMongooseManager.findAll(searchCriterial, optionsPagination)

    return res.render('home',{products, ...req.session})
})

router.get('/products/detailProduct/:pid', async(req, res) => {
    const id = req.params.pid
    try {
        const product = await ProductMongooseManager.findById(id)
        return res.render('products/detailProduct', {product})
    } catch (error) {
        return res.status(404).json({"Error": error.message})        
    }

})

router.get('/carts/:cid', async(req, res) => {
    const id = req.params.cid
    try {
        const cart = await CartMongooseManager.findByIdWithPopulate(id, 'products.product_id')
        return res.render('carts/cartlist', {cart})
    } catch (error) {
        // console.log(error)
        req.logger.error(error)
        return res.status(404).json({"Error": error.message})
    }
})

router.get('/login', async(req, res) => {
    if (!req.session.user) {
        return await res.render('login/login', {style:'login.css'})
    }

    return res.redirect('/')
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body

    if ((email === '' ) || (password === '')) {
        return res.status(400).render('login/login')
    }

    req.session.user = email
    req.session.rol = 'usuario'
    if ((email === 'adminCoder@coder.com') && (password === 'CoderHouse')) {
        req.session.rol = 'admin'
    }

    return res.redirect('/products')
})

router.get('/register', async(req, res) => {
    if (!req.session.user) {
        return res.render('login/register',{style:'login.css'})
    }
})

router.get('/logout', async(req, res) => {
    req.session.destroy( error => {
        if (!error) {
            res.send('Logout Ok')
            return res.redirect('/login')

        } else {
            return res.send({status: 'Error Logout', body: error})
        }
    })
})

export default router