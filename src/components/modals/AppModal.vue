<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
import { Icon } from '@iconify/vue';

const isOpened = defineModel<boolean>();
defineProps<{
  title?: string;
}>();

const closeModal = () => (isOpened.value = false);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpened"
        data-test="modal"
        class="modal"
      >
        <div
          class="modal__overlay"
          data-test="overlay"
          @click="closeModal"
        ></div>

        <div class="modal__content">
          <AppButton
            class="close-button"
            appearence="transparent"
            with-icon
            @click="closeModal"
          >
            <Icon
              icon="iconamoon:close-bold"
              color="#174473"
              width="32"
              height="32"
            />
          </AppButton>

          <h1
            class="modal__title"
            data-test="modal-title"
          >
            {{ title }}
          </h1>

          <div>
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/vars';

.modal {
  &__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 100px;
    max-width: 400px;
    width: 100%;
    padding: 16px;
    background: $bg-white;
    border-radius: 16px;
    z-index: 3;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    color: $color-medium-blue;
    margin-bottom: 16px;
    max-width: calc(100% - 40px);
  }

  .close-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }
}
</style>
<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
