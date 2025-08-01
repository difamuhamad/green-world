export default defineNuxtRouteMiddleware(async () => {
  const supabase = useSupabase();

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return navigateTo('/browser-app');
    }
  } catch (error) {
    console.error('Error checking session:', error);
    return navigateTo('/error');
  }
});
