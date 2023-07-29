<template>
  <AppModal
    v-model="isOpened"
    :title="$t('restore_password')"
  >
    <template #content>
      <RestorePasswordEmailStep
        v-if="step === ERestorePasswordSteps.EMAIL_STEP"
        @submit="goToPasswordStep"
      />
      <RestorePasswordStep v-else />
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from '@/components/AppModal.vue';
import RestorePasswordEmailStep from '@/modules/auth/components/restore-form/RestorePasswordEmailStep.vue';
import { ref } from 'vue';
import { ERestorePasswordSteps } from '@/modules/auth/domain/constants';
import RestorePasswordStep from '@/modules/auth/components/restore-form/RestorePasswordStep.vue';

const isOpened = defineModel<boolean>();

const step = ref<ERestorePasswordSteps>(ERestorePasswordSteps.EMAIL_STEP);

const goToPasswordStep = () => {
  step.value = ERestorePasswordSteps.PASSWORD_STEP;
};
</script>

<style scoped></style>
