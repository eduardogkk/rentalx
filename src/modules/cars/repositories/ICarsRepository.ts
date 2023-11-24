import { ICreateCarDTO } from '../dtos/ICreateCarsDTO'
import { Car } from '../infra/typeorm/entities/cars'

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
}

export { ICarsRepository }
