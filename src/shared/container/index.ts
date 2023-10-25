import { container } from 'tsyringe'
import { ICategoryRepository } from '../../modules/cars/repositories/IcategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/categoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository'

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationRepository',
  SpecificationRepository,
)
