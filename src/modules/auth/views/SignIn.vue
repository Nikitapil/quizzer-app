<template>
  <div class="centered-page">
    <AuthForm
      :title="$t('sign_in')"
      :submit-btn-text="$t('sign_in_action')"
    >
      <template #link>
        <RouterLink to="/">
          {{ $t('sign_up_action') }}
        </RouterLink>
      </template>
    </AuthForm>
  </div>
</template>

<script lang="ts" setup>
import AuthForm from '@/modules/auth/components/AuthForm.vue';
</script>
