<template>
  <header class="header">
    <div class="container w-100 header-container">
      <h1 class="logo">
        <RouterLink :to="{ name: ERoutesNames.HOME }">Quizzer</RouterLink>
      </h1>
      <nav>
        <ul class="header__navigation">
          <li>
            <RouterLink
              class="link"
              active-class="active-link"
              :to="{ name: ERoutesNames.ALL_QUIZES }"
            >
              {{ $t('all_quizzes') }}
            </RouterLink>
          </li>
          <template v-if="authStore.isLoading">
            <HorizontalLoader />
          </template>
          <template v-else-if="!authStore.user">
            <li>
              <RouterLink
                class="link"
                active-class="active-link"
                :to="{ name: ERoutesNames.SIGN_IN }"
              >
                {{ $t('sign_in_action') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="link"
                active-class="active-link"
                :to="{ name: ERoutesNames.SIGN_UP }"
              >
                {{ $t('sign_up_action') }}
              </RouterLink>
            </li>
          </template>
          <template v-else>
            <li>
              <RouterLink
                class="link"
                active-class="active-link"
                :to="{
                  name: ERoutesNames.USER_QUIZES,
                  params: { id: authStore.user.id }
                }"
              >
                {{ $t('my_quizzes') }}
              </RouterLink>
            </li>
            <li>
              <AppButton
                appearence="error"
                size="sm"
                :text="$t('logout')"
                @click="logout"
              />
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ERoutesNames } from '@/router/routes-names';
import HorizontalLoader from '@/components/loaders/HorizontalLoader.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import AppButton from '@/components/AppButton.vue';

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};
</script>

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
    align-items: center;
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
