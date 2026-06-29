export function useGreeting() {
  const greeting = ref('');
  onMounted(() => {
    const h = new Date().getHours();
    greeting.value = h < 11 ? 'Guten Morgen!' : h < 18 ? 'Guten Tag!' : 'Guten Abend!';
  });
  return greeting;
}
