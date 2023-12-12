import { Repository, getRepository } from 'typeorm'
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from '../../../repositories/ISpecificationRepository'
import { Specification } from '../entities/Specification'

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({
    description,
    name,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      name,
    })
    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids)
    return specifications
  }
}

export { SpecificationRepository }
