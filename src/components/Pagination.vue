<script setup lang="ts">
import { computed } from 'vue';
import AppButton from '@/components/buttons/AppButton.vue';

const props = defineProps<{
  limit: number;
  currentPage: number;
  totalItemsCount: number;
}>();

defineEmits<{
  'change-page': [page: number];
}>();

const pagesCount = computed(() =>
  Math.ceil(props.totalItemsCount / props.limit)
);
</script>

<template>
  <div
    v-if="pagesCount > 1"
    class="pagination"
    data-testid="pagination"
  >
    <AppButton
      v-for="page in pagesCount"
      :key="page"
      :text="page"
      :appearence="page === props.currentPage ? 'primary' : 'transparent'"
      size="lg"
      @click="$emit('change-page', page)"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 8px;
}
</style>
