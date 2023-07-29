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

<script lang="ts" setup>
import AuthForm from '@/modules/auth/components/AuthForm.vue';
import { ERoutesNames } from '@/router/routes-names';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import type { ISignUpAuthRequest } from '@/modules/auth/domain/types';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useAuthStore();

const onRegister = async (data: ISignUpAuthRequest) => {
  await store.register(data);
};

watch(
  () => store.user,
  () => {
    if (store.user) {
      router.push({ name: ERoutesNames.HOME });
    }
  },
  { immediate: true }
);
</script>
