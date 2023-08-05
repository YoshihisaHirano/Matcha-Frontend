export default function useClickOutside(
  elementRefs: Array<Ref<HTMLElement | null>>,
  callback: () => void
) {
  const onClickOutside = (event: Event) => {
    const clickedOutside = elementRefs.every((elt) => {
      return elt.value && !elt.value.contains(event.target as Node);
    });
    if (clickedOutside) {
      callback();
    }
  };

  const addClickListener = () => {
    document.addEventListener("click", onClickOutside);
  };

  const removeClickListener = () => {
    document.removeEventListener("click", onClickOutside);
  };

  onMounted(() => {
    addClickListener();
  });

  onUnmounted(() => {
    removeClickListener();
  });
}
