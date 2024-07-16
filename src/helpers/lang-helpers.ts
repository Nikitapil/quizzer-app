const LANG_KEY = 'lang';

export const setLangToStorage = (lang: string) => {
  return localStorage.setItem(LANG_KEY, lang);
};
