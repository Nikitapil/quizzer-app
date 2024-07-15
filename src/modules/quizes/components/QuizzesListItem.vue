<template>
  <li class="quiz-item">
    <div>
      <h3 class="quiz-item__title">{{ quiz.name }}</h3>
      <p class="quiz-item__text">
        {{ quiz.questionsCount }} {{ $t('questions_pl') }}
      </p>
      <p
        v-if="quiz.rating"
        class="quiz-item__text"
        data-test="rating"
      >
        {{ $t('rating') }}: {{ quiz.rating }}
        <Icon
          icon="ic:round-star"
          color="#d2e000"
          width="20"
          height="20"
        />
      </p>
      <p
        v-if="quiz.author"
        class="quiz-item__text"
        data-test="author"
      >
        <span>{{ $t('author') }}: </span>
        <RouterLink
          class="user-link"
          :to="{ name: ERoutesNames.USER_QUIZES, params: { id: quiz.userId } }"
        >
          {{ quiz.author }}
        </RouterLink>
      </p>
    </div>
    <div
      data-test="fav-block"
      class="controls"
    >
      <Tooltip
        v-if="userId"
        :tip="favouritesBtnTooltip"
      >
        <AppButton
          with-icon
          class="tool-btn"
          data-test="fav-button"
          appearence="dark"
          :disabled="isToggleFavouritesInProgress"
          @click="$emit('toggleFavourites', quiz)"
        >
          <Icon
            :icon="favouritesBtnIcon"
            color="#d2e000"
            width="24"
            height="24"
          />
        </AppButton>
      </Tooltip>
      <Tooltip
        v-if="isUsersIdsEquals"
        :tip="$t('edit')"
      >
        <AppButton
          class="tool-btn"
          data-test="edit"
          with-icon
          @click="
            router.push({
              name: ERoutesNames.EDIT_QUIZ,
              params: { id: quiz.id }
            })
          "
        >
          <Icon
            icon="ic:twotone-edit"
            color="#fff"
            width="25"
            height="25"
          />
        </AppButton>
      </Tooltip>
      <Tooltip
        v-if="canDelete"
        :tip="$t('delete')"
      >
        <AppButton
          class="tool-btn"
          data-test="delete"
          appearence="error"
          with-icon
          @click="isDeleteModalOpened = true"
        >
          <Icon
            icon="ic:round-delete"
            color="#fff"
            width="25"
            height="25"
          />
        </AppButton>
      </Tooltip>
      <AppButton
        appearence="dark"
        data-test="play"
        :text="$t('play')"
        @click="goToQuiz"
      />
    </div>
  </li>
  <ConfirmModal
    v-model="isDeleteModalOpened"
    :title="$t('delete_quiz_question')"
    :is-loading="isDeleteInProgress"
    :confirm-btn-text="$t('delete')"
    @confirm="$emit('delete', quiz.id)"
  />
</template>

<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue';
import { useRouter } from 'vue-router';
import { ERoutesNames } from '@/router/routes-names';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Tooltip from '@/components/Tooltip.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import type { QuizDto } from '@/api/swagger/Quizes/data-contracts';

const { t } = useI18n();

const router = useRouter();

const isDeleteModalOpened = ref(false);

defineEmits<{
  delete: [id: string];
  toggleFavourites: [quiz: QuizDto];
}>();

const props = defineProps<{
  quiz: QuizDto;
  userId: number;
  isDeleteInProgress: boolean;
  isToggleFavouritesInProgress: boolean;
  isAdmin: boolean;
}>();

const goToQuiz = () => {
  router.push({ name: ERoutesNames.QUIZ, params: { id: props.quiz.id } });
};

const isUsersIdsEquals = computed(() => props.quiz.userId === props.userId);
const canDelete = computed(() => isUsersIdsEquals.value || props.isAdmin);

const favouritesBtnIcon = computed(() =>
  props.quiz.isInFavourites ? 'ion:star' : 'ion:star-outline'
);

const favouritesBtnTooltip = computed(() =>
  props.quiz.isInFavourites
    ? t('remove_from_favourites')
    : t('add_to_favourites')
);
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/vars';

.quiz-item {
  max-width: 800px;
  width: 100%;
  border-radius: 15px;
  padding: 16px;
  background: $bg-white;
  box-shadow: $shadow-black-common;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    color: $color-blue;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__text {
    color: $color-medium-blue;
    display: flex;
    gap: 3px;
    align-items: center;
  }
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-btn {
  padding: 2px !important;
}

.user-link {
  color: inherit;
}
</style>
