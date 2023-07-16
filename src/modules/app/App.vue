<template>
  <div>
    <AppHeader />
    <div class="panel">
      <BreadCrumbs :breabcrums="store.breadCrumbs" />
      <lang-switcher />
    </div>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>
<script setup lang="ts">
import AppHeader from '@/modules/app/components/AppHeader.vue';
import BreadCrumbs from '@/modules/app/components/BreadCrumbs.vue';
import LangSwitcher from '@/modules/app/components/LangSwitcher.vue';
import { useAppStore } from '@/modules/app/store/AppStore';
const store = useAppStore();
</script>
<style lang="scss" scoped>
.panel {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}
</style>
