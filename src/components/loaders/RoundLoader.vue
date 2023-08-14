<template>
  <div
    data-test="round-loader"
    class="lds-dual-ring"
    :class="{ [color]: true }"
  ></div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: 'white' | 'blue';
  }>(),
  {
    color: 'white'
  }
);
</script>

<style lang="scss" scoped>
@import '../../assets/styles/colors';
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

.lds-dual-ring.blue:after {
  border-color: $color-medium-blue transparent $color-medium-blue transparent;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
