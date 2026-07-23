import { BaseTransformer } from '@adonisjs/core/transformers'
import Client from '#models/client'

export default class ClientTransformer extends BaseTransformer<Client> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'fullName',
      'cpf',
      'email',
      'favoriteColor',
      'notes',
      'createdAt',
      'updatedAt',
    ])
  }
}
