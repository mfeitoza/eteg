import type { HttpContext } from '@adonisjs/core/http'
import { appUrl } from '#config/app'
import { signedUrlFor } from '@adonisjs/core/services/url_builder'
import { createClientValidator } from '#validators/client'
import Client from '#models/client'
import ClientTransformer from '#transformers/client_transformer'

export default class ClientsController {
  async index({ inertia, request }: HttpContext) {
    const searchTerm: string = request.input('q', '')
    const page: number = request.input('page', 1)
    const limit: number = 10

    const clients = await Client.query()
      .orWhere('full_name', 'ilike', `%${searchTerm}%`)
      .orWhere('cpf', 'ilike', `%${searchTerm}%`)
      .orWhere('email', 'ilike', `%${searchTerm}%`)
      .orderBy('full_name', 'asc')
      .paginate(page, limit)

    return inertia.render('clients/index', {
      clients: ClientTransformer.paginate(clients.all(), clients.getMeta()),
      searchTerm: searchTerm,
    })
  }

  async generateLink({ response, session }: HttpContext) {
    const signedUrl = signedUrlFor(
      'clients.create',
      {},
      {
        expiresIn: '24h',
        prefixUrl: appUrl,
      }
    )

    session.flash('generatedLink', signedUrl)
    return response.redirect().back()
  }

  async create({ inertia, request, auth }: HttpContext) {
    const isLoggedIn = await auth.use('web').check()
    if (!isLoggedIn && !request.hasValidSignature()) {
      return inertia.render('clients/invalid_link', {})
    }

    const storeUrl = signedUrlFor(
      'clients.store',
      {},
      {
        expiresIn: '12h',
      }
    )

    return inertia.render('clients/create', { action: storeUrl })
  }

  async store({ inertia, request, session, response, auth }: HttpContext) {
    const isLoggedIn = await auth.use('web').check()
    if (!isLoggedIn && !request.hasValidSignature()) {
      return inertia.render('clients/invalid_link', {})
    }

    const payload = await request.validateUsing(createClientValidator)
    const client = await Client.create({ ...payload })

    session.flash('success', `Obrigado ${client.fullName}`)
    return response.redirect().toRoute('clients.success')
  }

  async success({ inertia }: HttpContext) {
    return inertia.render('clients/success', {})
  }
}
