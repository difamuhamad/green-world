export default defineNuxtPlugin(async () => {
  const L = await import('leaflet');
  await import('leaflet/dist/leaflet.css');

  return {
    provide: {
      leaflet: L,
    },
  };
});
