import { configApp } from '@adonisjs/eslint-config'
import { react } from '@adonisjs/eslint-config/react'

export default configApp({ ignores: ['.heroui-docs/**'] }, ...react)
