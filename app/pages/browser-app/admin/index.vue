<template>
  <!-- Header -->
  <header class="w-full h-16 shadow-md bg-white">
    <div class="container mx-auto h-full flex items-center px-4">
      <img
        src="/assets/images/main-logo.svg"
        alt="Logo"
        class="w-8 h-12 mr-3"
      />
      <div>
        <h1 class="text-xl font-bold text-primary">GREEN WORLD</h1>
        <p class="text-sm font-normal text-primary">
          Lingkungan Bersih, Kita Sehat
        </p>
      </div>
    </div>
  </header>

  <div class="flex justify-center items-center min-h-screen py-8 mx-40">
    <div class="w-full rounded-lg shadow-md border border-sky-600 p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary mb-4">
          Admin Dashboard Page
        </h1>
      </div>

      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        class="grid grid-cols-1 gap-6"
      >
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
              </Field>
            </div>
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="h-12 px-3 border border-l-0 border-sky-600 rounded-r-lg bg-white flex items-center justify-center"
              :class="{
                'border-red-500': errors?.length,
                'hover:bg-gray-50': true,
              }"
            >
              <Eye v-if="showPassword" class="w-5 h-5 text-gray-600" />
              <EyeOff v-else class="w-5 h-5 text-gray-600" />
            </button>
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
            class="bg-primary text-white text-base font-semibold h-12 rounded-2xl flex-1 hover:bg-primary-dark transition-colors"
          >
            Masuk
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { z } from 'zod';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Mail, Lock } from 'lucide-vue-next';
import { Eye, EyeOff } from 'lucide-vue-next';

definePageMeta({
  layout: false,
});

const showPassword = ref(false);

const schema = toTypedSchema(
  z.object({
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

// Handle form submission
const onSubmit = (values) => {
  console.log('Form submitted:', values);
};
</script>
