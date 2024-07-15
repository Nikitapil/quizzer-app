<script setup lang="ts">
import { ERoutesNames } from '@/router/routes-names';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

import HorizontalLoader from '@/components/loaders/HorizontalLoader.vue';
import Tooltip from '@/components/Tooltip.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import NavLink from '@/modules/app/components/app-header/NavLink.vue';

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};
</script>

<template>
  <nav>
    <ul class="navigation">
      <li>
        <NavLink
          :to="{ name: ERoutesNames.ALL_QUIZES }"
          :text="$t('all_quizzes')"
        />
      </li>

      <template v-if="authStore.isLoading">
        <HorizontalLoader />
      </template>

      <template v-else-if="!authStore.user">
        <li>
          <NavLink
            :to="{ name: ERoutesNames.SIGN_IN }"
            :text="$t('sign_in_action')"
          />
        </li>

        <li>
          <NavLink
            :to="{ name: ERoutesNames.SIGN_UP }"
            :text="$t('sign_up_action')"
          />
        </li>
      </template>

      <template v-else>
        <li>
          <NavLink
            :to="{
              name: ERoutesNames.USER_QUIZES,
              params: { id: authStore.user.id }
            }"
            :text="$t('my_quizzes')"
          />
        </li>

        <li>
          <NavLink
            :to="{ name: ERoutesNames.FAVOURITES }"
            :text="$t('favourites')"
          />
        </li>

        <li>
          <Tooltip :tip="$t('profile')">
            <NavLink
              :to="{ name: ERoutesNames.PROFILE }"
              icon="carbon:user-profile"
            />
          </Tooltip>
        </li>

        <li>
          <AppButton
            full
            appearence="error"
            size="sm"
            data-test="logout"
            :text="$t('logout')"
            @click="logout"
          />
        </li>
      </template>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>
