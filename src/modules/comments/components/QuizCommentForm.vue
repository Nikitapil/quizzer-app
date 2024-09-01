<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';

import AppButton from '@/components/buttons/AppButton.vue';
import AppTextarea from '@/components/inputs/AppTextarea.vue';

const props = withDefaults(
  defineProps<{
    isLoading: boolean;
    initialValue?: string;
  }>(),
  {
    initialValue: ''
  }
);

const emit = defineEmits<{
  submit: [string];
}>();

const { validate } = useForm();

const comment = ref('');

const submitHandler = async () => {
  const { valid } = await validate();
  if (valid) {
    emit('submit', comment.value);
    comment.value = '';
  }
};

onMounted(() => {
  comment.value = props.initialValue;
});
</script>

<template>
  <form
    class="form"
    @submit.prevent="submitHandler"
  >
    <AppTextarea
      v-model="comment"
      id="comment-text"
      name="comment-text"
      :placeholder="$t('comment_text')"
      rules="required"
      :disabled="props.isLoading"
    />

    <div class="actions">
      <slot name="additional-actions"></slot>
      <AppButton
        class="submit-btn"
        tabindex="0"
        type="submit"
        :text="$t('send')"
        :disabled="props.isLoading"
      />
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '../../../assets/styles/vars';
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: $bg-light-gray;
  padding: 1rem;
  border-radius: $border-radius-md;
  box-shadow: $shadow-black-common;
}

.actions {
  display: flex;
  gap: 0.5rem;
  align-self: flex-end;
}
</style>
