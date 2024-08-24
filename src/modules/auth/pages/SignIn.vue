<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { ISignUpAuthRequest } from '@/modules/auth/domain/types';
import { ERoutesNames } from '@/router/routes-names';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useUserWatchRedirect } from '@/modules/auth/composables/useUserWatchRedirect';

import RestorePasswordModal from '@/modules/auth/components/restore-form/RestorePasswordModal.vue';
import AuthForm from '@/modules/auth/components/AuthForm.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import RoundLoader from '@/components/loaders/RoundLoader.vue';

const { t } = useI18n();

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.SIGN_IN]);
useDocTitle(t('sign_in'));

const store = useAuthStore();

const isShowRestorePasswordModal = ref(false);

const onOpenRestoreModal = () => {
  isShowRestorePasswordModal.value = true;
};

const user = computed(() => store.user);

const onLogin = async (data: ISignUpAuthRequest) => {
  const { email, password } = data;
  await store.login({
    email,
    password
  });
};

useUserWatchRedirect(user);
</script>

<template>
  <div class="centered-page">
    <AuthForm
      v-if="!store.isLoading"
      :title="$t('sign_in')"
      :submit-btn-text="$t('sign_in_action')"
      @submit="onLogin"
    >
      <template #link>
        <AppButton
          id="restore-btn"
          class="restore-btn"
          appearence="transparent"
          :text="$t('restore_password')"
          @click="onOpenRestoreModal"
        />

        <RouterLink :to="{ name: ERoutesNames.SIGN_UP }">
          {{ $t('sign_up_action') }}
        </RouterLink>
      </template>
    </AuthForm>

    <RoundLoader v-else />

    <RestorePasswordModal v-model="isShowRestorePasswordModal" />
  </div>
</template>

<style lang="scss" scoped>
.restore-btn {
  margin-right: 24px;
}
</style>
