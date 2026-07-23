import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    cpf: vine
      .string()
      .trim()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .unique(async (db, value) => {
        const cleanedValue = value.replace(/\D/g, '')
        const client = await db.from('clients').where('cpf', cleanedValue).first()
        return !client
      })
      .transform((val) => val.replace(/\D/g, '')),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const client = await db.from('clients').where('email', value).first()
        return !client
      }),
    favoriteColor: vine.string().trim(),
    notes: vine.string().trim().optional(),
  })
)
