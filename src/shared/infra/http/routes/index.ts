import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specificationRoutes'
import { usersRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { rentalRoutes } from './rental.routes'
import { passwordRoutes } from './password.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationRoutes)
router.use('/users', usersRoutes)
router.use(authenticateRoutes)
router.use('/cars', carsRoutes)
router.use('/rental', rentalRoutes)
router.use('/password', passwordRoutes)

export { router }
