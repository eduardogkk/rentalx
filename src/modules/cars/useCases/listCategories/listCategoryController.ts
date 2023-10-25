/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCategoriesUseCase } from './listCategoriesUseCase'

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    const all = await listCategoriesUseCase.execute()

    return response.json(all)
  }
}

export { ListCategoryController }
