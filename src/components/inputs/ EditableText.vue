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
      <FormField
        :name="name"
        :rules="rules"
        :model-value="inputValue"
      >
        <template #default="{ invalid }">
          <AppInput
            :id="id"
            v-model="inputValue"
            :type="inputType"
            :is-error="invalid"
            :disabled="isLoading"
            focus-on-mount
          />
        </template>
      </FormField>
      <AppButton
        class="p-5"
        type="submit"
        appearence="transparent"
        with-icon
        :disabled="isLoading"
      >
        <Icon
          icon="simple-line-icons:check"
          color="#0ba360"
          width="24px"
          height="24px"
        />
      </AppButton>
    </form>
    <AppButton
      class="p-5"
      with-icon
      appearence="transparent"
      :disabled="isLoading"
      @click="toggleForm"
    >
      <Icon
        :icon="editButtonIcon.icon"
        :color="editButtonIcon.color"
        width="24px"
        height="24px"
      />
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppInput from '@/components/inputs/AppInput.vue';
import FormField from '@/components/inputs/FormField.vue';
import type { RuleExpression } from 'vee-validate';
import type { TInputType } from '@/components/inputs/types';
import AppButton from '@/components/AppButton.vue';
import { Icon } from '@iconify/vue';
import { useFormValidate } from '@/composables/useFormValidate';

const props = defineProps<{
  text: string;
  name: string;
  rules?: string | RuleExpression<unknown>;
  id: string;
  isLoading: boolean;
  inputType: TInputType;
}>();

const emit = defineEmits<{
  'submit-handler': [value: string];
}>();

const { validate } = useFormValidate();

const inputValue = ref('');
const isFormOpened = ref(false);

const editButtonIcon = computed(() =>
  isFormOpened.value
    ? {
        icon: 'carbon:close-filled',
        color: '#cd1f0e'
      }
    : {
        icon: 'ic:twotone-edit',
        color: '#d2e000'
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

<style lang="scss" scoped>
.editable-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.text {
  font-size: 20px;
}

.form {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
