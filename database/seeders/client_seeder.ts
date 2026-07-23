import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ClientFactory } from '#database/factories/client_factory'

export default class extends BaseSeeder {
  async run() {
    await ClientFactory.createMany(100)
  }
}
