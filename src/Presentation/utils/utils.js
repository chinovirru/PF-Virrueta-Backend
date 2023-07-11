import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

faker.location = 'es'

const generateId = (list) => {
    if (list.length === 0) {
        return 1
    }
    let id = Math.max(...list.map(item => item.id))
    
    return id+1
}

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSalt(10))

const isInvalidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const generateProducts = (count) => {
    let products = []
    for (let i=1; i<=count; i++) {
        products.push({
            description: faker.commerce.productDescription()
        })
    }

    return products

}

export { generateId, createHash, isInvalidPassword, generateProducts }