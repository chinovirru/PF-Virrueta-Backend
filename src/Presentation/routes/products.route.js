import { Router } from 'express'
import lodash from 'lodash';
import Product from '../../Core/entities/Product.js';
import ProductMongooseManager from '../../Infrastructure/dao/managers/ProductMongooseManager.js';
import { getProductsMock } from '../controllers/productsController.js';
import { deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products.controller.js';
const router = Router();

router.get('/', async(req, res) => {
    const parameters = req.query

    if (parameters.page) {
        if (isNaN(parameters.page) || (parseInt(parameters.page) < 1)) {
            return res.status(400).json({status : 'error'})
        }
    }

    const products = await getAllProducts(parameters)

    return res.status(200).json(products)
})

router.get('/:pid', async(req, res) => {
    const id = req.params.pid
    try {
        // const product = await ProductMongooseManager.findById(id)
        const product = await getProductById(id)
        return res.json(product)
    } catch (error) {
        return res.status(404).json({"Error": error.message})        
    }

})

router.post('/', async(req, res)=> {
    const product = new Product(
        req.body.title,
        req.body.description,
        req.body.code,
        req.body.price,
        req.body.status,
        req.body.stock,
        req.body.category,
        req.body.thumbnail
    )

    try {
        const newProduct = await ProductMongooseManager.create(product)
        return res.status(201).json(newProduct)
    
    } catch (error) {
        return res.status(404).json({"Error": error.message})
    }
})

router.put('/:pid', async(req, res) => {
    const { pickBy, isEmpty } = lodash
    const id = req.params.pid

    const productRecived = {
        title: req.body.title && req.body.title,
        description: req.body.description && req.body.description,
        code: req.body.code && req.body.code,
        price: req.body.price && req.body.price,
        status: req.body.status && req.body.status,
        stock: req.body.stock && req.body.stock,
        category: req.body.category && req.body.category,
        thumbnail: req.body.thumbnail && req.body.thumbnail
    }

    const productUpdate = pickBy(productRecived, (value, key) => {return value})
    if (isEmpty(productUpdate)) {
        return res.status(404).json({"Error": 'No se recibieron atributos para editar'})
    }
  
    try {
        // const productUpdated = await ProductMongooseManager.update(id, productUpdate)
        const productUpdated = await updateProduct(id, productRecived)
        return res.status(202).json({productUpdated})
    } catch(error) {
        return res.status(404).json({"Error": error.message})
    }
})

router.delete('/:pid', async(req, res) => {
    const id = req.params.pid
    try {
        // await ProductMongooseManager.deleteById(id)
        await deleteProduct(id)
        return res.status(200).json({"Mensaje": "Producto Eliminado"})
        
    } catch (error) {
        return res.status(404).json({"Error": error.message})
    }    
})

export default router