<template>
  <footer class="footer">
    <a
      class="footer__link"
      href="https://nikitapil.github.io/gamelandia/"
      target="_blank"
    >
      More games here
    </a>
  </footer>
</template>
<style scoped lang="scss">
@import '../../../assets/styles/colors';

.footer {
  padding: 10px;

  &__link {
    display: block;
    width: fit-content;
    font-size: 16px;
    text-decoration: none;
    color: inherit;
    margin-left: auto;
    transition: 0.4s;

    &:hover {
      text-shadow: $text-shadow-white-big;
    }
  }
}
</style>
