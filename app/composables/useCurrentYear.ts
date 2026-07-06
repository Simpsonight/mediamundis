export function useCurrentYear() {
  const year = ref(new Date().getFullYear());
  onMounted(() => { year.value = new Date().getFullYear(); });
  return year;
}
