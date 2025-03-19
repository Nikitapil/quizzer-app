<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';

import type { IQuizWithInFavoritesFlag } from '@/modules/shared/AddQuizToFavoritesButton/domain';

import { useAddQuizToFavorites } from '@/modules/shared/AddQuizToFavoritesButton/useAddQuizToFavorites';

import AppButton from '@/components/buttons/AppButton.vue';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    quiz: IQuizWithInFavoritesFlag;
    withText?: boolean;
  }>(),
  {
    withText: false
  }
);

const quizWithInFavoritesFlag = computed(() => props.quiz);

const favouritesBtnIcon = computed(() =>
  quizWithInFavoritesFlag.value.isInFavourites ? 'ion:star' : 'ion:star-outline'
);

const favouritesBtnText = computed(() =>
  quizWithInFavoritesFlag.value.isInFavourites
    ? t('remove_from_favourites')
    : t('add_to_favourites')
);

const { isToggleFavouritesInProgress, toggleFavorites } = useAddQuizToFavorites(
  quizWithInFavoritesFlag
);
</script>

<template>
  <AppButton
    class="fav-btn"
    :with-icon="!props.withText"
    data-test="fav-button"
    appearence="dark"
    :isLoading="isToggleFavouritesInProgress"
    @click="toggleFavorites"
  >
    <span
      v-if="props.withText"
      data-test="fav-btn-text"
      >{{ favouritesBtnText }}</span
    >
    <Icon
      :icon="favouritesBtnIcon"
      color="#d2e000"
      width="24"
      height="24"
    />
  </AppButton>
</template>

<style lang="scss" scoped>
.fav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
