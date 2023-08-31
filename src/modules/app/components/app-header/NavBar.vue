<template>
  <nav>
    <ul class="navigation">
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
          <RouterLink
            class="link"
            active-class="active-link"
            :to="{ name: ERoutesNames.FAVOURITES }"
          >
            {{ $t('favourites') }}
          </RouterLink>
        </li>
        <li>
          <Tooltip :tip="$t('profile')">
            <RouterLink
              class="link"
              active-class="active-link"
              :to="{ name: ERoutesNames.PROFILE }"
            >
              <Icon
                class="link-icon"
                icon="carbon:user-profile"
                color="white"
                width="22"
                height="22"
              />
            </RouterLink>
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

<script setup lang="ts">
import { ERoutesNames } from '@/router/routes-names';
import AppButton from '@/components/AppButton.vue';
import HorizontalLoader from '@/components/loaders/HorizontalLoader.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { Icon } from '@iconify/vue';
import Tooltip from '@/components/Tooltip.vue';

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/colors';

.navigation {
  display: flex;
  flex-wrap: wrap;
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

      &:has(.link-icon) .link-icon {
        filter: drop-shadow(1px 0 3px #fff);
      }
    }
  }
}

.link-icon {
  transition: 0.4s;

  &:hover {
    filter: drop-shadow(1px 0 3px #fff);
  }
}
</style>
