<template>
  <div
    class="flex flex-col items-center min-h-screen py-4 sm:mt-15 mt-10 md:py-8 px-4 sm:px-8 md:mx-40"
  >
    <div
      class="w-full max-w-md md:max-w-full rounded-lg border border-sky-600 p-4 md:p-8 my-4"
    >
      <h1
        class="text-2xl md:text-3xl font-bold text-primary text-center mb-6 md:mb-8"
      >
        Daftar Akun Baru
      </h1>

      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        class="grid grid-cols-1 gap-4 md:gap-6"
      >
        <!-- Full Name Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <User class="w-5 h-5 text-primary" />
            <label class="text-base md:text-lg font-semibold text-primary"
              >Nama Lengkap</label
            >
          </div>
          <div>
            <Field name="fullName" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="text"
                class="w-full h-10 md:h-12 text-sm md:text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors && errors.length }"
                placeholder="Masukkan nama lengkap"
              />
            </Field>
            <ErrorMessage
              name="fullName"
              class="text-red-500 mt-1 text-xs md:text-sm block"
            />
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Mail class="w-5 h-5 text-primary" />
            <label class="text-base md:text-lg font-semibold text-primary"
              >Email</label
            >
          </div>
          <div>
            <Field name="email" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="email"
                class="w-full h-10 md:h-12 text-sm md:text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors && errors.length }"
                placeholder="Masukkan email"
              />
            </Field>
            <ErrorMessage
              name="email"
              class="text-red-500 mt-1 text-xs md:text-sm block"
            />
          </div>
        </div>

        <!-- Phone Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Phone class="w-5 h-5 text-primary" />
            <label class="text-base md:text-lg font-semibold text-primary"
              >No Handphone</label
            >
          </div>
          <div>
            <Field name="phone" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="tel"
                class="w-full h-10 md:h-12 text-sm md:text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors && errors.length }"
                placeholder="Masukkan nomor handphone"
              />
            </Field>
            <ErrorMessage
              name="phone"
              class="text-red-500 mt-1 text-xs md:text-sm block"
            />
          </div>
        </div>

        <!-- Address Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Home class="w-5 h-5 text-primary" />
            <label class="text-base md:text-lg font-semibold text-primary"
              >Alamat</label
            >
          </div>
          <div>
            <Field name="address" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="text"
                class="w-full h-10 md:h-12 text-sm md:text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors && errors.length }"
                placeholder="Masukkan alamat lengkap"
              />
            </Field>
            <ErrorMessage
              name="address"
              class="text-red-500 mt-1 text-xs md:text-sm block"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Lock class="w-5 h-5 text-primary" />
            <label class="text-base md:text-lg font-semibold text-primary"
              >Password</label
            >
          </div>
          <div>
            <Field name="password" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="password"
                class="w-full h-10 md:h-12 text-sm md:text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors && errors.length }"
                placeholder="Buat password"
              />
            </Field>
            <ErrorMessage
              name="password"
              class="text-red-500 mt-1 text-xs md:text-sm block"
            />
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Lock class="w-5 h-5 text-primary" />
            <label class="text-base md:text-lg font-semibold text-primary"
              >Konfirmasi Password</label
            >
          </div>
          <div>
            <Field name="confirmPassword" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="password"
                class="w-full h-10 md:h-12 text-sm md:text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors && errors.length }"
                placeholder="Ulangi password"
              />
            </Field>
            <ErrorMessage
              name="confirmPassword"
              class="text-red-500 mt-1 text-xs md:text-sm block"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full h-10 md:h-12 bg-primary text-white text-base md:text-lg font-semibold rounded-3xl mt-4 md:mt-6 hover:bg-primary-dark transition-colors"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Memproses...' : 'Daftar Sekarang' }}
        </button>

        <p class="text-center text-sm md:text-base mt-3 md:mt-4">
          Sudah punya akun?
          <NuxtLink to="/browser-app" class="text-primary hover:underline"
            >Masuk disini</NuxtLink
          >
        </p>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { User, Mail, Phone, Home, Lock } from 'lucide-vue-next';
import { useSupabase } from '../../composables/supabase';
import type { SubmissionHandler } from 'vee-validate';

interface RegisterFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

// Supabase client
const supabase = useSupabase();

// validation schema
const schema = toTypedSchema(
  z
    .object({
      fullName: z
        .string()
        .min(3, { message: 'Nama lengkap minimal 3 karakter' })
        .max(50, { message: 'Nama lengkap maksimal 50 karakter' }),
      email: z
        .string()
        .min(1, { message: 'Email wajib diisi' })
        .email({ message: 'Format email tidak valid' }),
      phone: z
        .string()
        .min(10, { message: 'Nomor handphone minimal 10 digit' })
        .max(15, { message: 'Nomor handphone maksimal 15 digit' })
        .regex(/^[0-9]+$/, { message: 'Hanya boleh berisi angka' }),
      password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password tidak sama',
      path: ['confirmPassword'],
    })
);

const isSubmitting = ref(false);
const router = useRouter();

const onSubmit = (async (values: any) => {
  const formValues = values as RegisterFormValues;

  isSubmitting.value = true;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (authError) {
      throw authError;
    }

    if (!authData.user) {
      throw new Error('User data not available after sign up');
    }

    // Save Data to users Table
    const { error: profileError } = await supabase.from('users').insert([
      {
        id: authData.user.id, // ID from auth
        email: values.email,
        full_name: values.fullName,
        phone_number: formValues.phone,
        address: formValues.address,
        created_at: new Date().toISOString(),
      },
    ]);

    if (profileError) {
      throw profileError;
    }

    // redirect after finish
    router.push('/browser-app/profile');
  } catch (error: unknown) {
    console.error('Error during registration:', error);
    let errorMessage = 'Terjadi kesalahan saat registrasi';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    alert(`Registrasi gagal: ${errorMessage}`);
  } finally {
    isSubmitting.value = false;
  }
}) as SubmissionHandler;

// redirect if the user is aleready loged in
onMounted(async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push('/browser-app/profile');
    }
  } catch (error) {
    console.error('Error checking session:', error);
  }
});

definePageMeta({
  layout: 'secondary-layout',
});
</script>
