<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

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
@import '../../../assets/styles/vars';

.footer {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__link {
    display: block;
    width: fit-content;
    font-size: 18px;
    text-decoration: none;
    color: inherit;
    transition: $default-transition;

    &:hover {
      text-shadow: $text-shadow-white-big;
    }
  }
}

.hoverable-icon {
  &:hover {
    filter: $filter-white-shadow;
  }
}
</style>
