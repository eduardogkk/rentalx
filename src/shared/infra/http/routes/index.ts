import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specificationRoutes'
import { usersRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationRoutes)
router.use('/user', usersRoutes)
router.use(authenticateRoutes)
router.use('/car', carsRoutes)

export { router }
