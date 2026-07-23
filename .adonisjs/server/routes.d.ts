import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'health_checks.live': { paramsTuple?: []; params?: {} }
    'health_checks.ready': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'clients.create': { paramsTuple?: []; params?: {} }
    'clients.store': { paramsTuple?: []; params?: {} }
    'clients.success': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
    'clients.generate_link': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'health_checks.live': { paramsTuple?: []; params?: {} }
    'health_checks.ready': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'clients.create': { paramsTuple?: []; params?: {} }
    'clients.success': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'health_checks.live': { paramsTuple?: []; params?: {} }
    'health_checks.ready': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'clients.create': { paramsTuple?: []; params?: {} }
    'clients.success': { paramsTuple?: []; params?: {} }
    'clients.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'session.store': { paramsTuple?: []; params?: {} }
    'clients.store': { paramsTuple?: []; params?: {} }
    'clients.generate_link': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}