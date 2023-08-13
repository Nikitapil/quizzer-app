<template>
  <div
    ref="switcher"
    class="switcher"
  >
    <Icon
      class="switcher-icon"
      data-testid="switcher-icon"
      icon="tabler:world"
      color="white"
      width="28"
      @click.stop="open"
    />
    <Transition name="switcher">
      <div
        v-if="isOpened"
        class="lang-buttons"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc"
          :class="{ active: loc === locale }"
          class="lang-button"
          @click="changeLang(loc)"
        >
          {{ loc.toUpperCase() }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useClickOutside } from '@/composables/useClickOutside';

const { locale, availableLocales } = useI18n();

const changeLang = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('lang', lang);
  isOpened.value = false;
};

const isOpened = ref(false);
const switcher = ref(null);

const open = () => (isOpened.value = true);
const close = () => (isOpened.value = false);

useClickOutside(close, switcher);
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/colors';

.switcher {
  position: relative;
}

.switcher-icon {
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    filter: drop-shadow(1px 0 1px #fff);
  }
}

.lang-buttons {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -180%;
  border: 2px solid $color-dark-blue;

  .lang-button {
    font-size: 14px;
    font-weight: 600;
    padding: 2px 16px;
    border: none;
    background: none;
    color: inherit;
    transition: 0.4s;
    letter-spacing: 0.5px;
    overflow: hidden;

    &.active {
      background: $color-dark-blue;
    }

    &:hover {
      background: $color-dark-blue;
      opacity: 0.8;
    }
  }
}
</style>
<style>
.switcher-enter-active,
.switcher-leave-active {
  transition: opacity 0.5s ease;
}

.switcher-enter-from,
.switcher-leave-to {
  opacity: 0;
}
</style>
