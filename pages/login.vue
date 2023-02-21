<script setup lang="ts">
import { QInput, QBtn, QForm } from 'quasar'
const auth = useAuthStore()
const email = ref<string>('angelhdz@gmail.com')
const password = ref<string>('123456')

async function login(): Promise<Partial<User>> {
  try {
    await auth.login({
      email: email.value,
      password: password.value,
    })
    navigateTo('/')
  } catch (error) {
    Notify.create({
      message: error.message,
      color: 'negative',
    })
  }
}
</script>

<template>
  <div class="column full-width full-height items-center q-pt-lg q-gutter-sm">
    <span class="text-h6">Login</span>
    <QForm @submit.prevent="login">
      <QInput v-model="email" dense filled label="Email" />
      <QInput
        v-model="password"
        dense
        type="password"
        filled
        label="Password"
      />
      <QBtn type="submit" color="primary">Login</QBtn>
    </QForm>
  </div>
</template>
