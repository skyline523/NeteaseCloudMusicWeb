import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, app }) => {
  if (isClient)
    app.use(PerfectScrollbarPlugin)
}
