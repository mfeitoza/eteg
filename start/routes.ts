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
    router.get('/clients/create', [controllers.Clients, 'create']).as('clients.create')
    router.post('/clients/store', [controllers.Clients, 'store']).as('clients.store')
    router.get('/clients/success', [controllers.Clients, 'success']).as('clients.success')
  })

router
  .group(() => {
    router.get('/clients', [controllers.Clients, 'index']).as('clients.index')
    router.post('/clients/generate-link', [controllers.Clients, 'generateLink']).as('clients.generate_link')
    router.post('/logout', [controllers.Session, 'destroy']).as('session.destroy')
  })
  .use(middleware.auth())