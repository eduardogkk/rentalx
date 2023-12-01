/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, name, brand } = request.query
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
    const listCars = await listAvailableCarsUseCase.execute({
      category_id: category_id as string,
      name: name as string,
      brand: brand as string,
    })

    return response.json(listCars)
  }
}

export { ListAvailableCarsController }
