import { CategoriesRepository } from '../../repositories/implementations/categoriesRepository'
import { ListCategoriesUseCase } from './listCategoriesUseCase'
import { ListCategoryController } from './listCategoryController'

export default (): ListCategoryController => {
  const categoriesRepository = new CategoriesRepository()

  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)

  const listCategoryController = new ListCategoryController(
    listCategoriesUseCase,
  )

  return listCategoryController
}
