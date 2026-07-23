import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      table.string('full_name', 128).notNullable().index()
      table.string('cpf', 14).notNullable().unique()
      table.string('email', 128).notNullable().unique()
      table.string('favorite_color', 16).notNullable()
      table.string('notes', 256).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
