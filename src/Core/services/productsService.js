import { generateProducts } from "../../utils/utils"

const getProductsMock = async (count) => {
    const products = generateProducts(count)
    return await products
}

export {getProductsMock}