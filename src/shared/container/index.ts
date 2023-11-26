import { container } from 'tsyringe'
import { ICategoryRepository } from '../../modules/cars/repositories/IcategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/categoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/usersRepository'
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository'

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationRepository',
  SpecificationRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)
