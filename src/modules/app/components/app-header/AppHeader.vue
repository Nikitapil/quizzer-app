<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';

import { ERoutesNames } from '@/router/routes-names';

import NavBar from '@/modules/app/components/app-header/NavBar.vue';
import AppButton from '@/components/buttons/AppButton.vue';

const isMobileBarOpened = ref(false);

const burgerButtonIcon = computed(() =>
  isMobileBarOpened.value ? 'iconamoon:close-bold' : 'heroicons:bars-3-20-solid'
);

const toggleMobileBar = () =>
  (isMobileBarOpened.value = !isMobileBarOpened.value);

const closeMobileBar = () => (isMobileBarOpened.value = false);
</script>

<template>
  <header class="header">
    <div class="container w-100 header-container">
      <h1 class="logo">
        <RouterLink :to="{ name: ERoutesNames.HOME }">Quizzer</RouterLink>
      </h1>

      <div class="desktop-bar">
        <NavBar />
      </div>

      <AppButton
        class="burger-btn"
        with-icon
        appearence="transparent"
      >
        <div @click.stop="toggleMobileBar">
          <Icon
            :icon="burgerButtonIcon"
            width="28"
            height="28"
            data-test="burger-btn"
          />
        </div>
      </AppButton>

      <Transition name="mobile">
        <div
          v-if="isMobileBarOpened"
          v-click-outside="closeMobileBar"
          class="mobile-bar"
          data-test="mobile-bar"
        >
          <NavBar />
        </div>
      </Transition>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '../../../../assets/styles/vars';
.header {
  display: flex;
  align-items: center;
  min-height: 60px;
  width: 100%;
  background: $bg-dark-blue;
  box-shadow: $shadow-black-common;
  position: relative;
}

.logo {
  font-size: 32px;
  transition: 0.4s;
  font-weight: 700;
  letter-spacing: 1px;

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

.desktop-bar {
  @media (max-width: 545px) {
    display: none;
  }
}

.burger-btn {
  @media (min-width: 546px) {
    display: none;
  }
}

.mobile-bar {
  position: absolute;
  z-index: 5;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 60px 10px;
  background: $bg-medium-dark;
  transform-origin: top;

  &:deep {
    .link {
      font-size: 16px;
    }
  }

  @media (min-width: 546px) {
    display: none;
  }
}
</style>
<style>
.mobile-enter-active,
.mobile-bar-leave-active {
  transition: 0.5s ease;
}

.mobile-enter-from,
.mobile-leave-to {
  transform: scaleY(0);
}
</style>
