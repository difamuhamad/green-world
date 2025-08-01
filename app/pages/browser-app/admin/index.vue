<template>
  <div class="flex justify-center items-center min-h-screen py-8 mt-5 mx-40">
    <div class="w-full rounded-lg shadow-md border border-sky-600 p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary mb-4">
          Login to Admin Dashboard
        </h1>
      </div>

      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        class="grid grid-cols-1 gap-6"
        v-slot="{ errors: formErrors }"
      >
        <!-- Username Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <ShieldUser class="w-5 h-5 text-primary" />
            <label class="text-lg font-semibold text-primary">Username</label>
          </div>
          <div class="relative">
            <Field name="username" type="username" v-slot="{ field, errors }">
              <input
                v-bind="field"
                class="w-full h-12 text-base pl-12 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors.length }"
                placeholder="Masukkan username"
              />
            </Field>
            <ErrorMessage
              name="username"
              class="text-red-500 mt-1 text-sm block"
            />
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Mail class="w-5 h-5 text-primary" />
            <label class="text-lg font-semibold text-primary">Email</label>
          </div>
          <div class="relative">
            <Field name="email" type="email" v-slot="{ field, errors }">
              <input
                v-bind="field"
                class="w-full h-12 text-base pl-12 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors.length }"
                placeholder="Masukkan email"
              />
            </Field>
            <ErrorMessage
              name="email"
              class="text-red-500 mt-1 text-sm block"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Lock class="w-5 h-5 text-primary" />
            <label class="text-lg font-semibold text-primary">Password</label>
          </div>
          <div class="flex">
            <div class="relative flex-1">
              <Field name="password" v-slot="{ field, errors, meta }">
                <input
                  v-bind="field"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full h-12 text-base pl-12 rounded-l-lg border border-r-0 border-sky-600 shadow-sm"
                  :class="{
                    'border-red-500': errors.length,
                    'rounded-r-none': true,
                  }"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="h-12 px-3 border border-l-0 border-sky-600 rounded-r-lg bg-white flex items-center justify-center absolute right-0 top-0"
                  :class="{
                    'border-red-500': errors && errors.length,
                    'hover:bg-gray-50': true,
                  }"
                >
                  <Eye v-if="showPassword" class="w-5 h-5 text-gray-600" />
                  <EyeOff v-else class="w-5 h-5 text-gray-600" />
                </button>
              </Field>
            </div>
          </div>
          <ErrorMessage
            name="password"
            class="text-red-500 mt-1 text-sm block"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            type="submit"
            class="bg-primary text-white text-base font-semibold h-12 rounded-2xl flex-1 transition-colors"
            :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Signing in...' : 'Masuk' }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Mail, Lock, ShieldUser, Eye, EyeOff } from 'lucide-vue-next';
import type { SubmissionHandler } from 'vee-validate';

interface LoginFormValues {
  username: string;
  email: string;
  password: string;
}

const showPassword = ref(false);
const isSubmitting = ref(false);
const router = useRouter();
const supabase = useSupabase();
const adminStore = useAdminStore();

const schema = toTypedSchema(
  z.object({
    username: z.string().min(1, { message: 'Username wajib diisi' }),
    email: z
      .string()
      .min(1, { message: 'Email wajib diisi' })
      .email({ message: 'Format email tidak valid' }),
    password: z
      .string()
      .min(1, { message: 'Password wajib diisi' })
      .min(8, { message: 'Password minimal 8 karakter' }),
  })
);

const onSubmit: SubmissionHandler = async (values, { setFieldError }) => {
  isSubmitting.value = true;
  const formValues = values as LoginFormValues;

  try {
    // admin verification first
    const { data: admin, error: adminError } = await supabase
      .from('admin')
      .select('*')
      .eq('username', values.username)
      .eq('email', values.email)
      .single();

    if (adminError || !admin) {
      throw new Error('Kredensial admin tidak valid');
    }

    // normal login w
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (authError) {
      throw authError;
    }

    adminStore.setUser({
      username: admin.username,
      email: admin.email,
      avatar: admin.avatar,
    });

    await router.push('/browser-app/admin/dashboard');
  } catch (error) {
    console.error('Login error:', error);

    let errorMessage = 'Terjadi kesalahan saat login';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (errorMessage.includes('email')) {
      setFieldError('email', errorMessage);
    } else if (errorMessage.includes('password')) {
      setFieldError('password', errorMessage);
    } else {
      setFieldError('username', errorMessage);
    }
  } finally {
    isSubmitting.value = false;
  }
};

definePageMeta({
  layout: false,
});
</script>
