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
      :appearence="page === currentPage ? 'primary' : 'transparent'"
      @click="$emit('change-page', page)"
    />
  </div>
</template>

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

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 5px;
}
</style>
