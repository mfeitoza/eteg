import factory from '@adonisjs/lucid/factories'
import Client from '#models/client'
import { COLOR_PRESETS } from '#constants/colors'

export const ClientFactory = factory
  .define(Client, ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      email: faker.internet.email(),
      favoriteColor: faker.helpers.arrayElement(COLOR_PRESETS).code,
      notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.5 }) ?? null,
    }
  })
  .build()
