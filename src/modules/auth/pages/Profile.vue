<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useDocTitle } from '@/composables/useDocTitle';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

import { useAuthStore } from '@/modules/auth/store/AuthStore';

import type { EditUserDto } from '@/api/swagger/Users/data-contracts';
import { ERoutesNames } from '@/router/routes-names';

import UpdatePasswordModal from '@/modules/auth/components/UpdatePasswordModal.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import EditableText from '@/components/inputs/EditableText.vue';

const { t } = useI18n();
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.PROFILE]);
useDocTitle(t('profile'));

const router = useRouter();
const authStore = useAuthStore();

const emailEditMode = ref(false);
const usernameEditMode = ref(false);
const isUpdatePasswordModalShowed = ref(false);
const isDeleteProfileModalShowed = ref(false);

const editUser = async (
  dto: EditUserDto,
  controlShowingModel: Ref<boolean>
) => {
  const isUpdated = await authStore.editUser(dto);

  if (isUpdated && controlShowingModel.value) {
    controlShowingModel.value = false;
  }
};

const onChangeEmail = (email: string) => editUser({ email }, emailEditMode);

const onChangeUsername = async (username: string) =>
  editUser({ username }, usernameEditMode);

const onChangePassword = async (password: string) =>
  editUser({ password }, isUpdatePasswordModalShowed);

const onDeleteUser = async () => {
  const isDeleted = await authStore.deleteUser();

  if (isDeleted) {
    await router.push({ name: ERoutesNames.HOME });
  }
};
</script>

<template>
  <div
    v-if="authStore.user"
    class="centered-page page"
  >
    <h2 class="title">{{ $t('profile') }}</h2>

    <div class="profile-item">
      <span class="label">Email:</span>
      <EditableText
        v-model="emailEditMode"
        id="email"
        name="email"
        input-type="text"
        rules="email|required"
        :is-loading="authStore.isUpdateUserInProgress"
        :text="authStore.user.email"
        @submit-handler="onChangeEmail"
      />
    </div>

    <div class="profile-item">
      <span class="label">{{ $t('username_label') }}</span>
      <EditableText
        v-model="usernameEditMode"
        id="username"
        name="username"
        input-type="text"
        rules="required"
        :is-loading="authStore.isUpdateUserInProgress"
        :text="authStore.user.username"
        @submit-handler="onChangeUsername"
      />
    </div>

    <div class="profile-item">
      <AppButton
        full
        :text="$t('edit_password')"
        @click="isUpdatePasswordModalShowed = true"
      />
    </div>

    <div class="profile-item">
      <AppButton
        appearence="error"
        size="sm"
        :text="$t('delete_profile')"
        @click="isDeleteProfileModalShowed = true"
      />
    </div>

    <ConfirmModal
      v-model="isDeleteProfileModalShowed"
      :title="$t('delete_profile')"
      :text="$t('delete_profile_description')"
      :is-loading="authStore.isDeleteUserInProgress"
      :confirm-btn-text="$t('delete')"
      @confirm="onDeleteUser"
    />
  </div>

  <UpdatePasswordModal
    v-model="isUpdatePasswordModalShowed"
    :is-loading="authStore.isUpdateUserInProgress"
    @submit="onChangePassword"
  />
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.page {
  justify-content: flex-start;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
}

.profile-item {
  align-self: start;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 20px;
  margin-bottom: 8px;
}

.label {
  font-weight: 700;
}
</style>
