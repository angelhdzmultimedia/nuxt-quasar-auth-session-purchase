import * as components from 'quasar'
const { Quasar, Dark, Notify } = components

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    components,
    plugins: {
      Dark,
      Notify,
    },
  })
})
