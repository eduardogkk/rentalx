import { Router } from 'express'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController'
import { ListCategoryController } from '../modules/cars/useCases/listCategories/listCategoryController'
import multer from 'multer'

const categoriesRoutes = Router()
const upload = multer({
  dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoryController = new ListCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoryController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
)

export { categoriesRoutes }
