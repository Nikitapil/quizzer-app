<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useAuthRedirect } from '@/modules/auth/composables/useAuthRedirect';
import EditableText from '@/components/inputs/EditableText.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { ref } from 'vue';
import UpdatePasswordModal from '@/modules/profile/components/UpdatePasswordModal.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import { useDeleteUser } from '@/modules/auth/features/useDeleteUser';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';

const { t } = useI18n();
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.Profile]);
useDocTitle(t('profile'));
useAuthRedirect();

const authStore = useAuthStore();

const { deleteUser, isDeleteInProgress } = useDeleteUser();

const email = ref<InstanceType<typeof EditableText>>();
const username = ref<InstanceType<typeof EditableText>>();
const isUpdatePasswordModalShowed = ref(false);
const isDeleteProfileModalShowed = ref(false);

const onChangeEmail = async (newEmail: string) => {
  const isUpdated = await authStore.editUser({ email: newEmail });
  if (isUpdated && email.value) {
    email.value.toggleForm();
  }
};

const onChangeUsername = async (newUsername: string) => {
  const isUpdated = await authStore.editUser({ username: newUsername });
  if (isUpdated && username.value) {
    username.value.toggleForm();
  }
};

const onChangePassword = async (newPassword: string) => {
  const isUpdated = await authStore.editUser({ password: newPassword });
  if (isUpdated) {
    isUpdatePasswordModalShowed.value = false;
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
        ref="email"
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
        ref="username"
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
      :is-loading="isDeleteInProgress"
      :confirm-btn-text="$t('delete')"
      @confirm="deleteUser"
    />
  </div>
  <UpdatePasswordModal
    v-model="isUpdatePasswordModalShowed"
    :is-loading="authStore.isUpdateUserInProgress"
    @submit="onChangePassword"
  />
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/colors';

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
