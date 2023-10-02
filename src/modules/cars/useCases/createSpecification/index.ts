import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { CreateSpecificationController } from "./createSpecificationController";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

const specificationRepository = new SpecificationRepository()

const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }
