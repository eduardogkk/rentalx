/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './listCategoriesUseCase'

class ListCategoryController {
  // eslint-disable-next-line prettier/prettier
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

  handle(request: Request, response: Response): Response {
    const all = this.listCategoriesUseCase.execute()

    return response.json(all)
  }
}

export { ListCategoryController }
