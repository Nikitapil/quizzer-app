<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

import { ERestorePasswordSteps } from '@/modules/auth/components/restore-form/constants';

import RestorePasswordStep from '@/modules/auth/components/restore-form/RestorePasswordStep.vue';
import RestorePasswordEmailStep from '@/modules/auth/components/restore-form/RestorePasswordEmailStep.vue';
import AppModal from '@/components/modals/AppModal.vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';

const isOpened = defineModel<boolean>();

const store = useAuthStore();

const step = ref<ERestorePasswordSteps>(ERestorePasswordSteps.EMAIL_STEP);

const goToPasswordStep = async (email: string) => {
  const isRestoreKeySent = await store.getRestorePasswordKey(email);

  if (isRestoreKeySent) {
    step.value = ERestorePasswordSteps.PASSWORD_STEP;
  }
};
</script>

<template>
  <AppModal
    v-model="isOpened"
    :title="$t('restore_password')"
  >
    <template #content>
      <div
        v-if="store.isRestorePasswordLoading"
        class="loader"
      >
        <RoundLoader color="blue" />
      </div>

      <RestorePasswordEmailStep
        v-else-if="step === ERestorePasswordSteps.EMAIL_STEP"
        @submit="goToPasswordStep"
      />

      <RestorePasswordStep
        v-else
        @submit="store.restorePassword"
      />
    </template>
  </AppModal>
</template>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
