<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: 'white' | 'blue';
    size?: 'sm' | 'md' | 'lg' | 'xl';
  }>(),
  {
    color: 'white',
    size: 'xl'
  }
);

const sizes = computed(() => {
  if (props.size === 'sm') {
    return {
      mainRing: '16px',
      innerRing: '12px',
      border: '2px',
      margin: '2px'
    };
  }

  if (props.size === 'lg') {
    return {
      mainRing: '24px',
      innerRing: '18px',
      border: '3px',
      margin: '5px'
    };
  }
  return {
    mainRing: '80px',
    innerRing: '64px',
    border: '6px',
    margin: '8px'
  };
});
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
  width: v-bind('sizes.mainRing');
  height: v-bind('sizes.mainRing');
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: v-bind('sizes.innerRing');
  height: v-bind('sizes.innerRing');
  margin: v-bind('sizes.margin');
  border-radius: 50%;
  border: v-bind('sizes.border') solid;
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
