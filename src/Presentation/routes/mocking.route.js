import { Router } from 'express'
import lodash from 'lodash'
import Product from '../../Core/entities/Product.js'
import ProductMongooseManager from '../../Infrastructure/dao/managers/ProductMongooseManager.js'
import { getProductsMock } from '../controllers/productsController.js'
const router = Router()

router.get('/', async(req, res) => {
    const products = await getProductsMock(50)

    return res.status(200).json(products)
})

export default router