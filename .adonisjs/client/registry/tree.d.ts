/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  healthChecks: {
    live: typeof routes['health_checks.live']
    ready: typeof routes['health_checks.ready']
  }
  home: typeof routes['home']
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  clients: {
    create: typeof routes['clients.create']
    store: typeof routes['clients.store']
    success: typeof routes['clients.success']
    index: typeof routes['clients.index']
    generateLink: typeof routes['clients.generate_link']
  }
}
