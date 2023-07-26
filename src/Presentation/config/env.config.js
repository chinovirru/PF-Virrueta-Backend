// import { config }  from 'dotenv'
import 'dotenv/config'

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 8080
const MONGO_STRING_CONNECTION = process.env.MONGO_STRING_CONNECTION || ''
const MONGO_SECRET = process.env.MONGO_SECRET || ''

export { NODE_ENV, PORT, MONGO_STRING_CONNECTION, MONGO_SECRET }