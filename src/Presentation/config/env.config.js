// import { config }  from 'dotenv'
import 'dotenv/config'

const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 8080

export { NODE_ENV , PORT }