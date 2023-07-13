import { onMounted, onUnmounted } from 'vue';

export const useClickOutside = (
  callback: () => void,
  ref: HTMLElement | null
) => {
  const fn = (e: MouseEvent) => {
    if (e.target !== ref) {
      callback();
    }
  };

  onMounted(() => document.addEventListener('click', fn));
  onUnmounted(() => document.removeEventListener('click', fn));
};
