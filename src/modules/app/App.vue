<template>
  <div class="app">
    <AppHeader />
    <div class="panel">
      <BreadCrumbs :breabcrums="store.breadCrumbs" />
      <lang-switcher />
    </div>
    <main class="container main">
      <router-view />
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
const store = useAppStore();
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
