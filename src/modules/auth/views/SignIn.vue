<template>
  <div class="centered-page">
    <AuthForm
      v-if="!store.isLoading"
      :title="$t('sign_in')"
      :submit-btn-text="$t('sign_in_action')"
      @submit="onLogin"
    >
      <template #link>
        <RouterLink :to="{ name: ERoutesNames.SIGN_UP }">
          {{ $t('sign_up_action') }}
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
import type { ISignUpAuthRequest } from '@/modules/auth/types';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useAuthStore();

const onLogin = async (data: ISignUpAuthRequest) => {
  const { email, password } = data;
  await store.login({
    email,
    password
  });
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
