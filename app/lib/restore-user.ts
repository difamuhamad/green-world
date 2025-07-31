import { getUserBadge } from './utils';

export async function restoreUserFromSupabase() {
  const userStore = useUserStore();
  const supabase = useSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    const { data: profile, error } = await supabase
      .from('user_profile')
      .select('*')
      .eq('email', user.email)
      .single();

    const { data: userStats, error: errorStats } = await supabase
      .from('user_data')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!error && profile) {
      userStore.setUser({
        id: profile.id,
        nama: profile.full_name,
        email: user.email,
        domisili: profile.address,
        badge: getUserBadge(userStats.exp_level),
        points: userStats.point,
        join_year: profile.created_at,
      });
    } else {
      console.error('Gagal ambil profil user:', error);
    }
  }
}
