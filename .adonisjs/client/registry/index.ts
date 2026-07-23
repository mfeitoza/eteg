/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'clients.create': {
    methods: ["GET","HEAD"],
    pattern: '/clients/create',
    tokens: [{"old":"/clients/create","type":0,"val":"clients","end":""},{"old":"/clients/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['clients.create']['types'],
  },
  'clients.store': {
    methods: ["POST"],
    pattern: '/clients/store',
    tokens: [{"old":"/clients/store","type":0,"val":"clients","end":""},{"old":"/clients/store","type":0,"val":"store","end":""}],
    types: placeholder as Registry['clients.store']['types'],
  },
  'clients.success': {
    methods: ["GET","HEAD"],
    pattern: '/clients/success',
    tokens: [{"old":"/clients/success","type":0,"val":"clients","end":""},{"old":"/clients/success","type":0,"val":"success","end":""}],
    types: placeholder as Registry['clients.success']['types'],
  },
  'clients.index': {
    methods: ["GET","HEAD"],
    pattern: '/clients',
    tokens: [{"old":"/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.index']['types'],
  },
  'clients.generate_link': {
    methods: ["POST"],
    pattern: '/clients/generate-link',
    tokens: [{"old":"/clients/generate-link","type":0,"val":"clients","end":""},{"old":"/clients/generate-link","type":0,"val":"generate-link","end":""}],
    types: placeholder as Registry['clients.generate_link']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
