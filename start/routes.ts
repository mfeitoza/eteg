/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'


router.get('/favicon.png', async ({ response }) => {
  return response.download('public/favicon.png')
})

router.get('/logo.png', async ({ response }) => {
  return response.download('public/logo.png')
})

router
  .group(() => {
    router.get('/', [controllers.Clients, 'index']).as('home')
    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })



