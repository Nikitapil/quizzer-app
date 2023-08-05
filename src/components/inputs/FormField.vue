<template>
  <Field
    v-slot="{ field, errors, errorMessage, handleBlur, meta }"
    :name="name"
    :rules="rules"
    :validate-on-blur="true"
    :validate-on-change="true"
    :validate-on-input="true"
  >
    <BlurEmitter @blur="handleBlur">
      <div class="w-100">
        <slot
          v-bind="{
            ...field,
            invalid: errors && !!errors.length && meta.touched,
            handleBlur
          }"
        ></slot>
        <p
          v-if="errors && errors.length && meta.touched"
          class="error"
        >
          {{ customErrorMessage || errorMessage }}
        </p>
      </div>
    </BlurEmitter>
  </Field>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import type { RuleExpression } from 'vee-validate';
import BlurEmitter from '@/components/inputs/BlurEmitter.vue';

defineProps<{
  name: string;
  rules: string | RuleExpression<unknown>;
  customErrorMessage?: string;
}>();
</script>

<style lang="scss" scoped>
.error {
  color: red;
  margin-top: 4px;
}
</style>
