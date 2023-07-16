<template>
  <div class="breadcrumbs-container">
    <div
      v-for="(breadcrumb, index) in breabcrums"
      :key="breadcrumb.routeName"
    >
      <router-link
        v-if="index !== breabcrums.length - 1"
        class="breadcrumb-link"
        :to="{ name: breadcrumb.routeName }"
      >
        {{ $t(breadcrumb.title) }} /
      </router-link>
      <span v-else>{{ $t(breadcrumb.title) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBreadcrumb } from '@/modules/app/domain/types';

defineProps<{
  breabcrums: IBreadcrumb[];
}>();
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/colors';
.breadcrumbs-container {
  width: 100%;
  display: flex;
  gap: 3px;
}

.breadcrumb-link {
  color: inherit;
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    color: $color-dark-blue;
  }
}
</style>
