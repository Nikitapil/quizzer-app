<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import { Icon } from '@iconify/vue';

const props = withDefaults(
  defineProps<{
    text?: string;
    icon?: string;
    to: RouteLocationRaw;
  }>(),
  {
    text: '',
    icon: ''
  }
);
</script>

<template>
  <RouterLink
    class="link"
    active-class="active-link"
    :to="props.to"
  >
    <Icon
      v-if="props.icon"
      class="link-icon"
      :icon="props.icon"
      color="white"
      width="22"
      height="22"
    />

    <slot v-else>{{ text }}</slot>
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '../../../../assets/styles/vars';

.link {
  color: inherit;
  text-decoration: none;
  font-size: 18px;
  transition: $default-transition;

  &:hover {
    text-shadow: $text-shadow-white-big;
  }

  &.active-link {
    text-shadow: $text-shadow-white-big;

    .link-icon {
      filter: $filter-white-shadow;
    }
  }
}

.link-icon {
  transition: $default-transition;

  &:hover {
    filter: $filter-white-shadow;
  }
}
</style>
