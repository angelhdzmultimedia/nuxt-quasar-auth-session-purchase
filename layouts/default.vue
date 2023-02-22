<script setup lang="ts">
import {
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPage,
  QPageContainer,
  QAvatar,
  QList,
  QItem,
  QMenu,
  QItemSection,
} from 'quasar'

const auth = useAuthStore()

async function logout(): Promise<void> {
  await auth.logout()
  alert('after logout')
  navigateTo('/login')
}
</script>

<template>
  <QLayout view="hHh lpR fFf">
    <QHeader>
      <QToolbar>
        <QBtn icon="home" to="/" />
        <QToolbarTitle> App </QToolbarTitle>
        <QBtn to="/about">About</QBtn>
        <QAvatar class="cursor-pointer" color="white">
          <QMenu auto-close>
            <QList class="">
              <QItem class="">
                <QItemSection class="">
                  <QAvatar size="2.5em" color="white" />
                </QItemSection>
                <QItemSection class="">
                  <span class="">{{
                    auth.isAuth ? auth.user.name : 'Guest'
                  }}</span>
                </QItemSection>
              </QItem>
              <QItem v-if="!auth.isAuth">
                <QItemSection>
                  <QBtn to="/login" color="primary">Login</QBtn>
                </QItemSection>
              </QItem>
              <QItem v-if="!auth.isAuth">
                <QItemSection>
                  <QBtn to="/register" color="primary">Register</QBtn>
                </QItemSection>
              </QItem>
              <QItem v-if="auth.isAuth">
                <QItemSection>
                  <QBtn @click="logout" color="primary">Logout</QBtn>
                </QItemSection>
              </QItem>
            </QList>
          </QMenu>
        </QAvatar>
      </QToolbar>
    </QHeader>
    <QPageContainer class="">
      <QPage class="">
        <slot />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
