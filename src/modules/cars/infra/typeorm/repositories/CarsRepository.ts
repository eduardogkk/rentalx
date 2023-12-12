/* eslint-disable camelcase */
import { Repository, getRepository } from 'typeorm'
import { ICreateCarDTO } from '../../../dtos/ICreateCarsDTO'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
import { Car } from '../entities/cars'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    })

    return car
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Car[]> {
    const carQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })

    if (brand) {
      carQuery.andWhere('brand = :brand', { brand })
    }
    if (name) {
      carQuery.andWhere('name= :name', { name })
    }
    if (category_id) {
      carQuery.andWhere('category_id = :category_id', { category_id })
    }

    const cars = await carQuery.getMany()

    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id)

    return car
  }
}

export { CarsRepository }
