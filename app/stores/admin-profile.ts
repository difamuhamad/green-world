import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', () => {
  const username = ref('');
  const email = ref('');
  const avatar = ref('');

  function setUser(data: { username: string; email: string; avatar: string }) {
    username.value = data.username;
    email.value = data.email;
    avatar.value = data.avatar;
  }

  function resetUser() {
    username.value = '';
    email.value = '';
    avatar.value = '';
  }

  return {
    username,
    email,
    avatar,
    setUser,
    resetUser,
  };
});
