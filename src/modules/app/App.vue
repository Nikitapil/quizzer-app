<template>
  <div class="app">
    <AppHeader />
    <div class="panel">
      <BreadCrumbs :breadcrumbs="store.breadCrumbs" />
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
<script setup lang="ts">
import AppHeader from '@/modules/app/components/AppHeader.vue';
import BreadCrumbs from '@/modules/app/components/BreadCrumbs.vue';
import LangSwitcher from '@/modules/app/components/LangSwitcher.vue';
import { useAppStore } from '@/modules/app/store/AppStore';
import AppFooter from '@/modules/app/components/AppFooter.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { onMounted } from 'vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
const store = useAppStore();
const authStore = useAuthStore();

onMounted(() => {
  authStore.refresh();
});
</script>
<style lang="scss" scoped>
@import '../../assets/styles/vars';

.panel {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}

.main {
  min-height: $main-height;
}
</style>
