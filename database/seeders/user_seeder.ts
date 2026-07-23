import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.firstOrCreate(
      { email: 'admin@example.com' },
      {
        fullName: 'admin',
        password: 'admin',
      }
    )
  }
}
