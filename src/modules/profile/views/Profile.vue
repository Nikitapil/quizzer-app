<template>
  <div
    v-if="authStore.user"
    class="page"
  >
    <h2 class="title">{{ $t('profile') }}</h2>
    <div class="profile-item">
      <span class="label">Email:</span>
      <EditableText
        id="email"
        ref="email"
        name="email"
        input-type="text"
        rules="email|required"
        :is-loading="isLoading"
        :text="authStore.user.email"
        @submit-handler="onChangeEmail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import { useDocTitle } from '@/composables/useDocTitle';
import { useAuthRedirect } from '@/composables/useAuthRedirect';
import EditableText from '@/components/inputs/ EditableText.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { ref } from 'vue';
import { useUpdateUser } from '@/modules/auth/features/useUpdateUser';

const { t } = useI18n();
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.Profile]);
useDocTitle(t('profile'));
useAuthRedirect();

const authStore = useAuthStore();

const { isLoading, editUser } = useUpdateUser();

const email = ref<InstanceType<typeof EditableText>>();

const onChangeEmail = async (newEmail: string) => {
  const isUpdated = await editUser({ email: newEmail });
  if (isUpdated && email.value) {
    email.value.toggleForm();
  }
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';
@import '../../../assets/styles/colors';

.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  min-height: $main-height;
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
}

.label {
  font-weight: 700;
}
</style>
