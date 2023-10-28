import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specificationRoutes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationRoutes)
router.use('/user', usersRoutes)

export { router }
