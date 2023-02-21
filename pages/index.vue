<script setup lang="ts">
import { QInput, QBtn } from 'quasar'
const auth = useAuthStore()
const action = useActionStore()
const purchase = usePurchaseStore()
const canClick = ref(false)

onMounted(async () => {
  canClick.value = await purchase.verify('click', auth.user.id)
})

async function buy(action: string) {
  canClick.value = await purchase.buy(action, auth.user.id)
  if (canClick.value) {
    Notify.create({ message: 'Comprado.', color: 'positive' })
  } else {
    Notify.create({ message: 'Error con la compra.', color: 'negative' })
  }
}
</script>

<template>
  <div class="column justify-center items-center full-width full-height">
    <QSpinner color="primary" size="3em" v-if="auth.isLoading" />
    <div v-else>
      <QSpinner color="green" size="3em" v-if="purchase.isLoading" />
      <div v-else class="q-pt-xl column q-gutter-y-sm">
        <span :style="{ opacity: !canClick ? '0.5' : undefined }"
          >Clicks:
          <span class="text-h4 text-green">{{ action.count }}</span></span
        >
        <div>
          <QBtn :disabled="!canClick" @click="action.click" color="green"
            >CLICKEAME</QBtn
          >
        </div>
        <div
          v-if="!canClick"
          class="column"
          :style="{ opacity: !auth.isAuth ? '0.5' : undefined }"
        >
          <span>Funcionalidad Premium.</span>
          <QBtn :disabled="!auth.isAuth" @click="buy('click')" color="primary"
            >$</QBtn
          >
        </div>
      </div>
    </div>
  </div>
</template>
