<template>
  <div class="form-container">
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <h2 class="title">{{ title }}</h2>
      <FormField
        name="email"
        rules="required|email"
        :model-value="values.email"
      >
        <template #default="{ invalid }">
          <div class="input">
            <AppInput
              id="email"
              v-model="values.email"
              :placeholder="$t('email_placeholder')"
              label="Email:"
              :is-error="invalid"
            />
          </div>
        </template>
      </FormField>
      <FormField
        name="password"
        :rules="{ required: true, minLength: 8 }"
        :model-value="values.password"
      >
        <template #default="{ invalid }">
          <div class="input">
            <AppInput
              id="password"
              v-model="values.password"
              :placeholder="$t('password_placeholder')"
              type="password"
              :label="$t('password_label')"
              :is-error="invalid"
            />
          </div>
        </template>
      </FormField>
      <FormField
        v-if="useSignUp"
        name="username"
        rules="required"
        :model-value="values.username"
      >
        <template #default="{ invalid }">
          <div class="input">
            <AppInput
              id="username"
              v-model="values.username"
              :placeholder="$t('username_placeholder')"
              :label="$t('username_label')"
              :is-error="invalid"
            />
          </div>
        </template>
      </FormField>
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

<script setup lang="ts">
import FormField from '@/components/inputs/FormField.vue';
import { ref } from 'vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import { useForm } from 'vee-validate';
import { ISignUpAuthRequest } from '@/modules/auth/types';

defineProps<{
  title: string;
  submitBtnText: string;
  useSignUp?: boolean;
}>();

const emit = defineEmits<{
  submit: [ISignUpAuthRequest];
}>();

const { validate } = useForm();

const values = ref({
  email: '',
  password: '',
  username: ''
});

const onSubmit = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('submit', values.value);
  }
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';
@import '../../../assets/styles/colors';

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
  box-shadow: $shadow-black-common, inset 0 65px 45px -15px $color-blue;
  color: $color-blue;

  .title {
    font-size: 24px;
    font-weight: 700;
    align-self: center;
    color: $color-white;
  }

  .input {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
  transition: 0.4s;
  padding-right: 8px;

  &:hover {
    opacity: 0.7;
  }
}
</style>
