<template>
  <header class="header">
    <div class="container w-100 header-container">
      <h1 class="logo">
        <RouterLink :to="{ name: ERoutesNames.HOME }">Quizzer</RouterLink>
      </h1>
      <NavBar />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ERoutesNames } from '@/router/routes-names';
import NavBar from '@/modules/app/components/app-header/NavBar.vue';
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/colors';
.header {
  display: flex;
  align-items: center;
  min-height: 60px;
  width: 100%;
  background: $bg-dark-blue;
  box-shadow: $shadow-black-common;
}

.logo {
  font-size: 32px;
  transition: 0.4s;
  font-weight: 700;
  letter-spacing: 0.5px;

  &:hover {
    text-shadow: $text-shadow-white-big;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
