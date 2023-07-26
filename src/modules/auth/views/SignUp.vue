<template>
  <div class="centered-page">
    <AuthForm
      :title="$t('sign_up')"
      :submit-btn-text="$t('sign_up_action')"
      use-sign-up
    />
  </div>
</template>

<script lang="ts" setup>
import AuthForm from '@/modules/auth/components/AuthForm.vue';
</script>
