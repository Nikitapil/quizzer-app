<template>
  <AppModal
    v-model="isOpened"
    :title="title"
  >
    <template #content>
      <p
        v-if="text"
        class="text"
      >
        {{ text }}
      </p>
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
          data-test="delete-btn"
          appearence="error"
          :text="confirmBtnTextInternal"
          :disabled="isLoading"
          @click="$emit('confirm')"
        />
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from '@/components/AppModal.vue';
import AppButton from '@/components/AppButton.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const isOpened = defineModel<boolean>('modelValue');
defineEmits(['confirm']);

const { t } = useI18n();

const props = defineProps<{
  isLoading: boolean;
  title: string;
  text?: string;
  confirmBtnText?: string;
}>();

const confirmBtnTextInternal = computed(
  () => props.confirmBtnText || t('confirm')
);
</script>

<style lang="scss" scoped>
@import '../assets/styles/colors';

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.text {
  margin-bottom: 16px;
  color: $color-dark-blue;
  font-size: 18px;
}
</style>
