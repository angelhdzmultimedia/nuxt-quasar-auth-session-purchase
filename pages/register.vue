<script setup lang="ts">
import { QInput, QBtn } from 'quasar'
const auth = useAuthStore()
</script>

<template>
  <div>
    <span>Register</span>
    <QInput label="Email" />
    <QBtn color="primary">Login</QBtn>
  </div>
</template>
