<template>
  <div class="tooltip">
    <div class="tip-content">
      <slot></slot>
    </div>
    <div class="tip">{{ tip }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tip: string;
}>();
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
}

.tip {
  position: absolute;
  top: 145%;
  left: 50%;
  width: 150px;
  min-height: 40px;
  border-radius: 12px;
  transform: translateX(-50%);
  background: black;
  color: #fff;
  display: none;
  z-index: 100;
  text-align: center;
  padding: 5px;

  &:before {
    content: '';
    position: absolute;
    top: -8px;
    display: block;
    background: black;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
  }
}

.tip-content:hover + .tip {
  @media (hover: hover) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
