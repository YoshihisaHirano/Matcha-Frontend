export default function useMediaQuery(query: string) {
  const isMatch = ref(false);

  if (process.client) {
    const updateMatch = (event: MediaQueryListEvent) => {
      isMatch.value = event.matches;
    };

    const addListener = () => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', updateMatch);
    };

    const removeListener = () => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.removeEventListener('change', updateMatch);
    };

    onMounted(() => {
      addListener();
      isMatch.value = window.matchMedia(query).matches;
    });

    onBeforeUnmount(() => {
      removeListener();
    });
  }

  return isMatch;
}
