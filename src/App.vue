<template>
  <div>
    <p :style="{ fontWeight: 700 }">{{ $t('hello') }}</p>
    <p :style="{ fontWeight: 600 }">SEMI-BOLD</p>
    <p :style="{ fontWeight: 400 }">
      Whereas recognition of the inherent dignity
    </p>
    <button @click="changeLang('ru')">RU</button>
    <button @click="changeLang('en')">EN</button>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLang = (lang: string) => {
  locale.value = lang;
};
</script>
