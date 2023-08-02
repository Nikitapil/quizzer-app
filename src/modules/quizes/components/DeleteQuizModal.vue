<template>
  <AppModal
    v-model="isOpened"
    :title="$t('delete_quiz_question')"
  >
    <template #content>
      <div class="buttons">
        <AppButton
          full
          appearence="dark"
          :text="$t('cancel')"
          :disabled="isLoading"
          @click="isOpened = false"
        />
        <AppButton
          full
          appearence="error"
          :text="$t('delete')"
          :disabled="isLoading"
          @click="$emit('delete')"
        />
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from '@/components/AppModal.vue';
import AppButton from '@/components/AppButton.vue';

const isOpened = defineModel<boolean>('modelValue');
defineEmits(['delete']);

defineProps<{
  isLoading: boolean;
}>();
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
</style>
