<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: 'white' | 'blue';
  }>(),
  {
    color: 'white'
  }
);
</script>

<template>
  <div
    data-test="round-loader"
    class="lds-dual-ring"
    :class="{ [props.color]: true }"
  ></div>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/vars';
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
  border: 6px solid;
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
