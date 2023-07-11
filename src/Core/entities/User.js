class User {
    first_name
    last_name
    email
    age
    password
    cart
    role
    documents

    constructor(first_name, last_name='', email, age=0, password, cart='', role, documents=[]) {
        this.first_name = first_name
        this.last_name = last_name
        this.email = email,
        this.age = age,
        this.password = password,
        this.cart = cart,
        this.role = role,
        this.documents = documents
    }
}

export default ProductCart