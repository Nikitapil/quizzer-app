<template>
  <div class="error-page">
    <h2 class="error-page__title">{{ $t('page_not_found') }}</h2>
    <div class="error-page__numbers">404</div>
    <div class="error-page__link-container">
      <RouterLink
        class="error-page__link"
        :to="{ name: ERoutesNames.HOME }"
      >
        <Icon
          icon="maki:arrow"
          color="white"
          width="24"
          :horizontalFlip="true"
        />
        {{ $t('go_main') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ERoutesNames } from '@/router/routes-names';
import { useDocTitle } from '@/composables/useDocTitle';
import { Icon } from '@iconify/vue';
import { useBreadCrumbs } from '@/modules/app/composables/useBreadCrumbs';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
useDocTitle('404');
useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.ERROR]);
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/colors';
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__title {
    font-size: 40px;
    margin-bottom: 20px;
  }

  &__numbers {
    font-size: 120px;
    font-weight: 700;
  }

  &__link {
    font-size: 24px;
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__link-container {
    display: flex;
    align-items: center;
    gap: 5px;
    transition: 0.4s;
    &:hover {
      filter: drop-shadow($text-shadow-white-big);
    }
  }
}
</style>
