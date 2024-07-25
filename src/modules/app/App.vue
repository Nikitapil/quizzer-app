<script setup lang="ts">
import { useAppStore } from '@/modules/app/store/AppStore';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

import AppHeader from '@/modules/app/components/app-header/AppHeader.vue';
import BreadCrumbs from '@/modules/app/components/BreadCrumbs.vue';
import LangSwitcher from '@/modules/app/components/LangSwitcher.vue';
import AppFooter from '@/modules/app/components/AppFooter.vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';

const store = useAppStore();
const authStore = useAuthStore();
</script>

<template>
  <div class="app">
    <AppHeader />

    <div class="panel">
      <BreadCrumbs :breadcrumbs="store.breadcrumbs" />
      <lang-switcher />
    </div>

    <main class="container main">
      <div
        v-if="authStore.isLoading"
        class="centered-page"
      >
        <RoundLoader />
      </div>

      <router-view v-else />
    </main>

    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.panel {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
