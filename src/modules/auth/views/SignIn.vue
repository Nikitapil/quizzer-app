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

<script lang="ts" setup>
import AuthForm from '@/modules/auth/components/AuthForm.vue';
import { ERoutesNames } from '@/router/routes-names';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import type { ISignUpAuthRequest } from '@/modules/auth/domain/types';
import RoundLoader from '@/components/loaders/RoundLoader.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import AppButton from '@/components/buttons/AppButton.vue';
import RestorePasswordModal from '@/modules/auth/components/restore-form/RestorePasswordModal.vue';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.SIGN_IN]);
useDocTitle(t('sign_in'));

const router = useRouter();
const store = useAuthStore();

const isShowRestorePasswordModal = ref(false);

const onOpenRestoreModal = () => {
  isShowRestorePasswordModal.value = true;
};

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
<style lang="scss" scoped>
.restore-btn {
  margin-right: 24px;
}
</style>
