<script setup lang="ts">
import { ref } from 'vue';

import type { ISignUpAuthRequest } from '@/modules/auth/domain/types';

import { useForm } from 'vee-validate';

import AppButton from '@/components/buttons/AppButton.vue';
import AppInput from '@/components/inputs/AppInput.vue';

withDefaults(
  defineProps<{
    title: string;
    submitBtnText: string;
    useSignUp?: boolean;
  }>(),
  {
    useSignUp: false
  }
);

const emit = defineEmits<{
  submit: [ISignUpAuthRequest];
}>();

const { validate } = useForm();

const values = ref({
  email: '',
  password: '',
  username: ''
});

const confirmedPassword = ref('');

const onSubmit = async () => {
  const { valid } = await validate();

  if (valid) {
    emit('submit', values.value);
  }
};
</script>

<template>
  <div class="form-container">
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <h2 class="title">{{ title }}</h2>

      <AppInput
        v-model="values.email"
        id="email"
        name="email"
        rules="required|email"
        :placeholder="$t('email_placeholder')"
        label="Email:"
      />

      <AppInput
        v-model="values.password"
        id="password"
        name="password"
        :rules="{ required: true, minLength: 8 }"
        :placeholder="$t('password_placeholder')"
        type="password"
        :label="$t('password_label')"
      />

      <template v-if="useSignUp">
        <AppInput
          v-model="confirmedPassword"
          id="confirm-password"
          name="confirm-password"
          rules="confirmed:password"
          :placeholder="$t('password_placeholder')"
          type="password"
          :label="$t('repeat_password')"
        />
        <AppInput
          v-model="values.username"
          id="username"
          name="username"
          rules="required"
          :placeholder="$t('username_placeholder')"
          :label="$t('username_label')"
        />
      </template>

      <AppButton
        :text="submitBtnText"
        type="submit"
      />
    </form>

    <div class="link-container">
      <slot name="link"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.form-container {
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form {
  width: 100%;
  background: $color-white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  box-shadow: $form-shadow;
  color: $color-blue;

  .title {
    font-size: 24px;
    font-weight: 700;
    align-self: center;
    color: $color-white;
  }
}

.link-container {
  margin-left: auto;
  margin-top: 16px;
  font-size: 18px;
}

.link-container :slotted(a) {
  font-size: 18px;
  color: $color-white;
  align-self: flex-end;
  margin-top: 16px;
  text-decoration: none;
  transition: $default-transition;
  padding-right: 8px;

  &:hover {
    opacity: 0.7;
  }
}
</style>
