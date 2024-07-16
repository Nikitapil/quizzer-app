<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';

import { setLangToStorage } from '@/helpers/lang-helpers';

const { locale, availableLocales } = useI18n();

const changeLang = (lang: string) => {
  locale.value = lang;
  setLangToStorage(lang);
  isOpened.value = false;
};

const isOpened = ref(false);

const open = () => (isOpened.value = true);
const close = () => (isOpened.value = false);
</script>

<template>
  <div
    v-click-outside="close"
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

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.switcher {
  position: relative;
}

.switcher-icon {
  cursor: pointer;
  transition: $default-transition;

  &:hover {
    filter: $filter-white-shadow;
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
    background: #222;
    color: inherit;
    transition: $default-transition;
    letter-spacing: 0.5px;
    overflow: hidden;

    &.active {
      background: #888;
      color: #000;
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
