import { generateProducts } from '../utils/utils.js'

const getProductsMock = async (count) => {
    const products = generateProducts(count)
    return await products
}

export { getProductsMock }