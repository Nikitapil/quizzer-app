<script setup lang="ts">
import type { IBreadcrumb } from '@/modules/app/domain/types';

defineProps<{
  breadcrumbs: IBreadcrumb[];
}>();
</script>

<template>
  <div class="breadcrumbs-container">
    <div
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="breadcrumb.routeName"
    >
      <router-link
        v-if="index !== breadcrumbs.length - 1"
        class="breadcrumb-link"
        :to="{ name: breadcrumb.routeName }"
      >
        {{ $t(breadcrumb.title) }} /
      </router-link>

      <span v-else>{{ $t(breadcrumb.title) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';
.breadcrumbs-container {
  width: 100%;
  display: flex;
  gap: 3px;
}

.breadcrumb-link {
  color: inherit;
  text-decoration: none;
  transition: $default-transition;

  &:hover {
    text-shadow: $text-shadow-white-big;
  }
}
</style>
