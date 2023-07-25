<template>
  <Field
    v-slot="{ field, errors, errorMessage }"
    :name="name"
    :rules="rules"
    :validate-on-blur="true"
    :validate-on-change="true"
    :validate-on-input="true"
  >
    <div class="w-100">
      <slot v-bind="{ ...field, invalid: errors && !!errors.length }"></slot>
      <p
        v-if="errors && errors.length"
        class="error"
      >
        {{ customErrorMessage || errorMessage }}
      </p>
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field, RuleExpression } from 'vee-validate';

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
