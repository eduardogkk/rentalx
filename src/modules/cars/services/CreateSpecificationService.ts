

import { Specification } from "../model/Specification";
import { ISpecificationsRepository } from "../repositories/ISpecificationRepository";

interface IRequest {
  name: string,
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  execute({description, name}: IRequest): void {
    const specificationAlreadyExist = this.specificationsRepository.findByName(name);

    if(specificationAlreadyExist) {
      throw new Error("Specification already exist!")
      
    }

    this.specificationsRepository.create({
      name,
      description,
    })
  }
};

export { CreateSpecificationService };