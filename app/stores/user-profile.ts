import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const id = ref('');
  const nama = ref('');
  const email = ref('');
  const domisili = ref('');
  const badge = ref('');
  const points = ref('0');
  const join_year = ref(new Date().getFullYear().toString());

  function setUser(data: {
    id: string;
    nama: string;
    email: string;
    domisili: string;
    badge: string;
    points: string;
    join_year: string;
  }) {
    id.value = data.id;
    nama.value = data.nama;
    email.value = data.email;
    domisili.value = data.domisili;
    badge.value = data.badge;
    points.value = data.points;
    join_year.value = data.join_year;
  }

  function resetUser() {
    id.value = '';
    nama.value = '';
    email.value = '';
    domisili.value = '';
    badge.value = '';
    points.value = '0';
    join_year.value = new Date().getFullYear().toString();
  }

  return {
    id,
    nama,
    email,
    domisili,
    badge,
    points,
    join_year,
    setUser,
    resetUser,
  };
});
