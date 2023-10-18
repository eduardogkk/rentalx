/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './createCategoryUseCase'

class CreateCategoryController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body
    await this.createCategoryUseCase.execute({ name, description })

    return response.status(201).send()
  }
}

export { CreateCategoryController }
