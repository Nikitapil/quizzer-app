<script lang="ts" setup>
import { toRef } from 'vue';
import { useI18n } from 'vue-i18n';

import type { ISignUpAuthRequest } from '@/modules/auth/domain/types';
import { ERoutesNames } from '@/router/routes-names';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { useDocTitle } from '@/composables/useDocTitle';

import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import RoundLoader from '@/components/loaders/RoundLoader.vue';
import AuthForm from '@/modules/auth/components/AuthForm.vue';
import { useUserWatchRedirect } from '@/modules/auth/composables/useUserWatchRedirect';

const { t } = useI18n();

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.SIGN_UP]);
useDocTitle(t('sign_up'));

const store = useAuthStore();

const onRegister = async (data: ISignUpAuthRequest) => {
  await store.register(data);
};

useUserWatchRedirect(toRef(store.user));
</script>

<template>
  <div class="centered-page">
    <AuthForm
      v-if="!store.isLoading"
      :title="$t('sign_up')"
      :submit-btn-text="$t('sign_up_action')"
      use-sign-up
      @submit="onRegister"
    >
      <template #link>
        <RouterLink :to="{ name: ERoutesNames.SIGN_IN }">
          {{ $t('sign_in_action') }}
        </RouterLink>
      </template>
    </AuthForm>
    <RoundLoader v-else />
  </div>
</template>
