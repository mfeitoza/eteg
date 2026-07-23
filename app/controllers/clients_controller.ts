import type { HttpContext } from '@adonisjs/core/http'
import { createClientValidator } from '#validators/client'
import Client from '#models/client'
import ClientTransformer from '#transformers/client_transformer'

export default class ClientsController {
  async index({ inertia, request }: HttpContext) {
    const searchTerm: string = request.input('q', '')

    const clients = await Client.query()
      .orWhere('full_name', 'ilike', `%${searchTerm}%`)
      .orWhere('cpf', 'ilike', `%${searchTerm}%`)
      .orWhere('email', 'ilike', `%${searchTerm}%`)

    return inertia.render('clients/index', { clients: ClientTransformer.transform(clients), searchTerm: searchTerm })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('clients/create', {})
  }

  async store({ inertia, request, session, response }: HttpContext) {
    const payload = await request.validateUsing(createClientValidator)
    const client = await Client.create({ ...payload })
    session.flash('success', `Obrigado ${client.fullName}.`)
    return response.redirect().toRoute('clients.success')
  }

  async success({ inertia }: HttpContext) {
    return inertia.render('clients/success', {})
  }
}
