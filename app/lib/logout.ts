import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user-data';

export const logoutUser = async (router: ReturnType<typeof useRouter>) => {
  const supabase = useSupabase();
  const userStore = useUserStore();

  try {
    // Supabase sign out
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Reset user state
    userStore.resetUser();

    // redirect to home
    router.push('/');
  } catch (err) {
    console.error('Logout gagal:', err);
  }
};
