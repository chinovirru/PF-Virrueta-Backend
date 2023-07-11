import express from 'express'
import productsRoutes from './src/Presentation/routes/products.route.js'
import cartsRoutes from './src/Presentation/routes/carts.route.js'
import sessionsRoutes from './src/Presentation/routes/sessions.route.js'
import mockingsRoutes from './src/Presentation/routes/mocking.route.js'
import { Server } from 'socket.io'
import viewsRoute from './src/Presentation/routes/views.route.js'
import { engine } from 'express-handlebars'
import ProductManager from './src/Infrastructure/dao/managers/ProductManager.js'
import initMongoose from './src/Presentation/server/mongoose.js'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import Handlebars from 'handlebars'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import { customLog, handlerLogger } from './src/Presentation/utils/logger.js'
import loggersRoutes from './src/Presentation/routes/loggers.route.js'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from './src/Presentation/config/swagger.config.js'
import swaggerUIExpress from 'swagger-ui-express'
import { NODE_ENV, PORT } from './src/Presentation/config/env.config.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://mongoadmin:Mongoadmin2023@ecommerce.benldra.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
        ttl:1
    }),
    secret:'sessions',
    resave:false,
    saveUninitialized:false
}))

app.use(handlerLogger)

const specs = swaggerJSDoc(swaggerOptions)
app.use('/api', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/api/sessions', sessionsRoutes)
app.use('/api/mockingproducts', mockingsRoutes)
app.use('/api/loggerTest', loggersRoutes)
app.use('/', viewsRoute)

const puerto = PORT
const serverExpress = app.listen(puerto, () => {
    customLog('info', 'Express connected')
    // console.log("Express connected")
})

initMongoose()

const serverIo = new Server(serverExpress)
serverIo.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('recibirProductos', async () => {
        const productManager = new ProductManager('./src/data/products.json')
        socket.emit('actualizar', await productManager.getProducts())
    })

    socket.on('nuevoProducto', async (newProd) => {
        const productManager = new ProductManager('./src/data/products.json')
        try {
            const product = await productManager.addProduct(
                newProd.title,
                newProd.description,
                newProd.code,
                newProd.price,
                newProd.status,
                newProd.stock,
                newProd.category,
                newProd.thumbnail)        
        } catch (error) {
            console.log(error)
        }

        serverIo.sockets.emit('actualizar', await productManager.getProducts())
    })

    socket.on('quitarProducto', async(id) => {
        const productManager = new ProductManager('./src/data/products.json')
        await productManager.removeProduct(parseInt(id))

        serverIo.sockets.emit('actualizar', await productManager.getProducts())
    })
})