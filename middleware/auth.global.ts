export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  await auth.findProfile()
})
