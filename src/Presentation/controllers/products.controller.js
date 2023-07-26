import ProductMongooseManager from "../../Infrastructure/dao/managers/ProductMongooseManager.js"

const getAllProducts = async ( parameters ) => {
    const searchCriterial = {}
    if (parameters.query) {
        searchCriterial = isNaN(parameters.query) ? {category: parameters.query} : {stock: category}
    }

    const optionsPagination = {
        limit: parseInt(parameters.limit) ?? 10,
        page: isNaN(parseInt(parameters.page)) ? 1 : parseInt(parameters.page)
    }

    if (parameters.sort) {
        optionsPagination.sort = parameters.sort === 'asc' ? {price: 1} : {price: -1}
    }

    const products = await ProductMongooseManager.findAll(searchCriterial, optionsPagination)

    return products
}

const getProductById = async ( id ) => {
    const product = await ProductMongooseManager.findById(id)
    return product
}

const updateProduct = async ( id, data ) => {
    const productUpdated = await ProductMongooseManager.productUpdated(id, data)
    return productUpdated
}

const deleteProduct = async ( id ) => {
    return await ProductMongooseManager.deleteById(id)
}

export { getAllProducts, getProductById, updateProduct, deleteProduct }