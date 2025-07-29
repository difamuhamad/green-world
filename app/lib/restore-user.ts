export async function restoreUserFromSupabase() {
  const userStore = useUserStore();
  const supabase = useSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email) {
    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();

    if (!error && profile) {
      userStore.setUser({
        nama: profile.full_name,
        email: user.email,
        domisili: profile.address,
        badge: profile.badge_level,
        points: profile.points,
        join_year: profile.created_at,
      });
    } else {
      console.error('Gagal ambil profil user:', error);
    }
  }
}
