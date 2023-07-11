import { Router } from 'express'
import { getLoggers } from '../controllers/loggersController.js'

const router = Router()

router.get('/', async(req, res) => {
    getLoggers()
})

export default router