<script setup lang="ts">
import { computed, ref } from 'vue';

import { type RuleExpression, useForm } from 'vee-validate';
import type { TInputType } from '@/components/inputs/types';

import { useI18n } from 'vue-i18n';

import AppInput from '@/components/inputs/AppInput.vue';
import Tooltip from '@/components/Tooltip.vue';
import IconButton from '@/components/buttons/IconButton.vue';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    text: string;
    name: string;
    id: string;
    isLoading: boolean;
    inputType: TInputType;
    rules?: string | RuleExpression<unknown>;
  }>(),
  {
    rules: ''
  }
);

const emit = defineEmits<{
  'submit-handler': [value: string];
}>();

const { validate } = useForm();

const inputValue = ref('');
const isFormOpened = ref(false);

const editButtonIcon = computed(() =>
  isFormOpened.value
    ? {
        icon: 'carbon:close-filled',
        color: '#cd1f0e',
        tip: t('close')
      }
    : {
        icon: 'ic:twotone-edit',
        color: '#d2e000',
        tip: t('edit')
      }
);

const toggleForm = () => {
  isFormOpened.value = !isFormOpened.value;

  if (isFormOpened.value) {
    inputValue.value = props.text;
  }
};

const onSubmit = async () => {
  const { valid } = await validate();

  if (valid) {
    emit('submit-handler', inputValue.value);
  }
};

defineExpose({
  toggleForm
});
</script>

<template>
  <div class="editable-text">
    <p
      v-if="!isFormOpened"
      class="text"
    >
      {{ text }}
    </p>

    <form
      v-else
      class="form"
      @submit.prevent="onSubmit"
    >
      <AppInput
        v-model="inputValue"
        :id="id"
        :name="name"
        :type="inputType"
        :disabled="isLoading"
        :rules="rules"
        focus-on-mount
      />

      <Tooltip :tip="$t('save')">
        <IconButton
          type="submit"
          icon="simple-line-icons:check"
          color="#0ba360"
          data-test="submit-button"
          :disabled="isLoading"
        />
      </Tooltip>
    </form>

    <Tooltip :tip="editButtonIcon.tip">
      <IconButton
        :icon="editButtonIcon.icon"
        :color="editButtonIcon.color"
        data-test="toggle-button"
        :disabled="isLoading"
        @click="toggleForm"
      />
    </Tooltip>
  </div>
</template>

<style lang="scss" scoped>
.editable-text,
.form {
  display: flex;
  align-items: center;
  gap: 8px;
}

.editable-text {
  min-height: 40px;
}

.text {
  font-size: 20px;
}
</style>
