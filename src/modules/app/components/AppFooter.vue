<template>
  <footer class="footer">
    <a
      class="footer__link hoverable-icon"
      href="https://github.com/Nikitapil/quizzer-app"
      target="_blank"
    >
      <Icon
        icon="bi:github"
        width="30"
        height="30"
        color="white"
      />
    </a>
    <a
      class="footer__link"
      href="https://nikitapil.github.io/gamelandia/"
      target="_blank"
    >
      {{ $t('more_games_here') }}
    </a>
  </footer>
</template>
<style scoped lang="scss">
@import '../../../assets/styles/colors';

.footer {
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__link {
    display: block;
    width: fit-content;
    font-size: 18px;
    text-decoration: none;
    color: inherit;
    transition: 0.4s;

    &:hover {
      text-shadow: $text-shadow-white-big;
    }
  }
}

.hoverable-icon {
  &:hover {
    filter: drop-shadow(0.2px -0.2px 5px #fff);
  }
}
</style>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
