import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import App from './App.vue'
import type { UserModule } from './types'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'overlayscrollbars/styles/overlayscrollbars.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: [
      {
        path: '/',
        redirect: '/handpicked',
      },
      ...setupLayouts(routes),
    ],
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)

    if (import.meta.hot)
      handleHotUpdate(ctx.router)
  },
)
