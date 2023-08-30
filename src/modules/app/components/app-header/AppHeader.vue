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
        data-test="burger-btn"
      >
        <div
          ref="burgerRef"
          @click.stop="toggleMobileBar"
        >
          <Icon
            icon="heroicons:bars-3-20-solid"
            width="28"
            height="28"
          />
        </div>
      </AppButton>
      <Transition name="mobile">
        <div
          v-if="isMobileBarOpened"
          ref="mobileRef"
          class="mobile-bar"
          data-test="mobile-bar"
        >
          <NavBar />
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ERoutesNames } from '@/router/routes-names';
import NavBar from '@/modules/app/components/app-header/NavBar.vue';
import AppButton from '@/components/AppButton.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useClickOutside } from '@/composables/useClickOutside';

const isMobileBarOpened = ref(false);

const toggleMobileBar = () =>
  (isMobileBarOpened.value = !isMobileBarOpened.value);

const mobileRef = ref(null);
const burgerRef = ref(null);

useClickOutside(
  () => {
    if (isMobileBarOpened.value) {
      isMobileBarOpened.value = false;
    }
  },
  mobileRef,
  burgerRef
);
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
  position: relative;
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
  top: 60px;
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
