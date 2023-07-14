<template>
  <Field
    v-slot="{ field, errors, errorMessage }"
    :name="name"
    :rules="rules"
    :validate-on-blur="true"
    :validate-on-change="true"
    :validate-on-input="true"
  >
    <slot v-bind="{ ...field, invalid: errors && !!errors.length }"></slot>
    <p v-if="errors && errors.length">
      {{ customErrorMessage || errorMessage }}
    </p>
  </Field>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';

defineProps<{
  name: string;
  rules: string | object;
  customErrorMessage?: string;
}>();
</script>

<style lang="scss" scoped></style>
