<template>
  <div class="home-page">
    <form class="generation-form">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </form>
  </div>
</template>
<script setup>
import { useDocTitle } from '@/composables/useDocTitle';

useDocTitle('');
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/vars';
@import '../../../assets/styles/colors';

.home-page {
  width: 100%;
  min-height: $main-height;
  display: flex;
  align-items: center;
  justify-content: center;
}

.generation-form {
  max-width: 340px;
  width: 100%;
  background: $color-white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 20px;
  box-shadow: $shadow-black-common;

  input {
    width: 100%;
  }
}
</style>
