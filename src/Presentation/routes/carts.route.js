import { Router } from 'express'
import CartManager from '../../Infrastructure/dao/managers/CartManager.js'
import CartMongooseManager from '../../Infrastructure/dao/managers/CartMongooseManager.js'

const router = Router()

router.post('/', async(req, res) => {
    const cartManager = new CartManager('./src/data/cart.json')
    try {
        const cart = await cartManager.addCart(req.body)
        return res.status(201).json(cart)
    } catch (error) {
        return res.status(404).json({"Error": error.message})
    }
})

router.get('/:cid', async(req, res) => {
    const id = req.params.cid
    try {
        const cart = await CartMongooseManager.findByIdWithPopulate(id, 'products.product_id')
        return res.status(200).json(cart)        
    } catch (error) {
        // console.log(error)
        req.logger.error(error)
        return res.status(404).json({"Error": error.message})
    }
})

router.post('/:cid/products/:pid', async(req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    if (isNaN(cartId) || (cartId < 1)) {
        return res.status(404).json({"Error": "El Id del Cart debe ser un numero ó mayor que 0"})
    }
    if (isNaN(productId) || (productId < 1)) {
        return res.status(404).json({"Error": "El Id del Product debe ser un numero ó mayor que 0"})
    }

    const cartManager = new CartManager('./src/data/cart.json')
    try {
        const cart = await cartManager.addProductToCart(cartId, productId)
        return res.status(201).json(cart)
    } catch (error) {
        return res.status(404).json({"Error": error.message})
        
    }
})

router.delete('/:cid/products/:pid', async(req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    const {_id, products} = await CartMongooseManager.findById(cartId)
    const newProductsInCart = products.filter((product) => product.product_id !== productId)
    const cartUpdated = await CartMongooseManager.update(cartId, {products: newProductsInCart})
    
    return res.status(202).json(cartUpdated)
})

router.put('/:cid', async(req, res) => {
    const cartId = req.params.cid
    const products = req.body
    const cartUpdated = await CartMongooseManager.update(cartId, products)

    return res.status(202).json(cartUpdated)

})

router.put('/:cid/products/:pid', async(req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    const newQuantity = req.body.quantity
    const {_id, products} = await CartMongooseManager.findById(cartId)
    const productsUpdated = products.map((product) => {
        if (product.product_id === productId) {
            product.quantity = newQuantity
        }

        return product
    })
    
    const cartUpdated = await CartMongooseManager.update(cartId, {products: productsUpdated})

    return res.status(202).json(cartUpdated)
})

router.delete('/:cid', async(req, res) => {
    const cartId = req.params.cid
    const cartUpdated = await CartMongooseManager.update(cartId, {products: []})

    return res.status(202).json(cartUpdated)
})

export default router