import { quasar } from '@quasar/vite-plugin'

function quasarExtra(path: string): string {
  return `@quasar/extras/${path}/${path}.css`
}

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  ssr: false,
  css: [
    'quasar/src/css/index.sass',
    quasarExtra('roboto-font'),
    quasarExtra('material-icons'),
    quasarExtra('fontawesome-v6'),
  ],
  build: {
    transpile: ['quasar'],
  },
  vite: {
    plugins: [quasar()],
  },
  imports: {
    dirs: ['stores/**'],
    imports: [
      { from: 'quasar', name: 'Dark' },
      { from: 'quasar', name: 'Notify' },
      { from: 'pinia', name: 'defineStore' },
      { from: 'pinia', name: 'storeToRefs' },
    ],
  },
})
