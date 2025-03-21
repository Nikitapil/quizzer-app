<script setup lang="ts">
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import AppModal from '@/components/modals/AppModal.vue';
import AppButton from '@/components/buttons/AppButton.vue';

const { t } = useI18n();

const isOpened = defineModel<boolean>('modelValue');

const props = withDefaults(
  defineProps<{
    title: string;
    isLoading?: boolean;
    text?: string;
    confirmBtnText?: string;
  }>(),
  {
    isLoading: false,
    text: '',
    confirmBtnText: ''
  }
);

defineEmits<{
  confirm: [];
}>();

const confirmBtnTextInternal = computed(
  () => props.confirmBtnText || t('confirm')
);
</script>

<template>
  <AppModal
    v-model="isOpened"
    :title="title"
  >
    <template #content>
      <p
        v-if="text"
        class="text"
        data-test="confirm-text"
      >
        {{ text }}
      </p>

      <div class="buttons">
        <AppButton
          full
          appearence="dark"
          data-test="cancel-btn"
          :text="$t('cancel')"
          :isLoading="isLoading"
          @click="isOpened = false"
        />

        <AppButton
          full
          data-test="confirm-btn"
          appearence="error"
          :text="confirmBtnTextInternal"
          :isLoading="isLoading"
          @click="$emit('confirm')"
        />
      </div>
    </template>
  </AppModal>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/vars';

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
