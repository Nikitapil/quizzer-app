<template>
  <header class="header">
    <div class="container w-100 header-container">
      <h1 class="logo">
        <router-link to="/">Quizzer</router-link>
      </h1>
      <nav>
        <ul class="header__navigation">
          <li>
            <router-link
              class="link"
              active-class="active-link"
              :to="{ name: ERoutesNames.ALL_QUIZES }"
            >
              {{ $t('all_quizzes') }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/colors';
.header {
  display: flex;
  align-items: center;
  min-height: 60px;
  width: 100%;
  background: $bg-dark-blue;
  box-shadow: $shadow-black-common;

  &__navigation {
    display: flex;
    gap: 16px;

    .link {
      color: inherit;
      text-decoration: none;
      font-size: 18px;
      transition: 0.4s;

      &:hover {
        text-shadow: $text-shadow-white-big;
      }

      &.active-link {
        text-shadow: $text-shadow-white-big;
      }
    }
  }
}

.logo {
  font-size: 32px;
  transition: 0.4s;
  font-weight: 700;
  letter-spacing: 0.5px;

  &:hover {
    text-shadow: $text-shadow-white-big;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<script setup lang="ts">
import { ERoutesNames } from '@/router/routes-names';
</script>
