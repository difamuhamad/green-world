<template>
  <div class="flex flex-col items-center min-h-screen py-8 mx-40">
    <div class="w-full rounded-lg border border-sky-600 p-8 my-4">
      <h1 class="text-3xl font-bold text-primary text-center mb-8">
        Daftar Akun Baru
      </h1>

      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        class="grid grid-cols-1 gap-6"
      >
        <!-- Full Name Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <User class="w-5 h-5 text-primary" />
            <label class="text-lg font-semibold text-primary"
              >Nama Lengkap</label
            >
          </div>
          <div>
            <Field name="fullName" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="text"
                class="w-full h-12 text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors.length }"
                placeholder="Masukkan nama lengkap"
              />
            </Field>
            <ErrorMessage
              name="fullName"
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
          <div>
            <Field name="email" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="email"
                class="w-full h-12 text-base px-4 rounded-lg border border-sky-600 shadow-sm"
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

        <!-- Phone Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Phone class="w-5 h-5 text-primary" />
            <label class="text-lg font-semibold text-primary"
              >No Handphone</label
            >
          </div>
          <div>
            <Field name="phone" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="tel"
                class="w-full h-12 text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors.length }"
                placeholder="Masukkan nomor handphone"
              />
            </Field>
            <ErrorMessage
              name="phone"
              class="text-red-500 mt-1 text-sm block"
            />
          </div>
        </div>

        <!-- Address Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Home class="w-5 h-5 text-primary" />
            <label class="text-lg font-semibold text-primary">Alamat</label>
          </div>
          <div>
            <Field name="address" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="text"
                class="w-full h-12 text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors.length }"
                placeholder="Masukkan alamat lengkap"
              />
            </Field>
            <ErrorMessage
              name="address"
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
          <div>
            <Field name="password" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="password"
                class="w-full h-12 text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors.length }"
                placeholder="Buat password"
              />
            </Field>
            <ErrorMessage
              name="password"
              class="text-red-500 mt-1 text-sm block"
            />
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div>
          <div class="flex gap-3 items-center mb-2">
            <Lock class="w-5 h-5 text-primary" />
            <label class="text-lg font-semibold text-primary"
              >Konfirmasi Password</label
            >
          </div>
          <div>
            <Field name="confirmPassword" v-slot="{ field, errors }">
              <input
                v-bind="field"
                type="password"
                class="w-full h-12 text-base px-4 rounded-lg border border-sky-600 shadow-sm"
                :class="{ 'border-red-500': errors.length }"
                placeholder="Ulangi password"
              />
            </Field>
            <ErrorMessage
              name="confirmPassword"
              class="text-red-500 mt-1 text-sm block"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full h-12 bg-primary text-white text-lg font-semibold rounded-3xl mt-6 hover:bg-primary-dark transition-colors"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Memproses...' : 'Daftar Sekarang' }}
        </button>

        <p class="text-center text-base mt-4">
          Sudah punya akun?
          <NuxtLink to="/browser-app" class="text-primary hover:underline"
            >Masuk disini</NuxtLink
          >
        </p>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { z } from 'zod';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { User, Mail, Phone, Home, Lock } from 'lucide-vue-next';

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
      address: z.string().min(10, { message: 'Alamat minimal 10 karakter' }),
      password: z
        .string()
        .min(8, { message: 'Password minimal 8 karakter' })
        .regex(/[A-Z]/, { message: 'Harus mengandung huruf besar' })
        .regex(/[0-9]/, { message: 'Harus mengandung angka' })
        .regex(/[^A-Za-z0-9]/, { message: 'Harus mengandung karakter khusus' }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password tidak sama',
      path: ['confirmPassword'],
    })
);

const isSubmitting = ref(false);

const onSubmit = async (values) => {
  isSubmitting.value = true;
};

definePageMeta({
  layout: 'secondary-layout',
});
</script>
