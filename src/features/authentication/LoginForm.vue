<script setup>
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import { useLogin } from './useLogin'

import FormInput from '@/components/FormInput.vue'
import FormRowVertical from '@/components/FormRowVertical.vue'
import MainForm from '@/components/MainForm.vue'
import SharedButton from '@/components/SharedButton.vue'
import SpinnerMini from '@/components/SpinnerMini.vue'

const { login, isLoading } = useLogin()

const schema = object({
  email: string()
    .required('This field is required')
    .email('Please provide a valid email address')
    .matches(/\S+@\S+\.\S+/, 'Please provide a valid email address'),
  password: string().required('This filed is required'),
})

const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(({ email, password }) => {
  login(
    { email, password },
    {
      onSettled: () => {
        resetForm()
      },
    },
  )
})
</script>

<template>
  <MainForm @submit="onSubmit">
    <FormRowVertical label="Email address" :error="errors.email">
      <FormInput
        type="email"
        id="email"
        :disabled="isLoading"
        v-model="email"
        v-bind="emailAttrs"
      />
    </FormRowVertical>

    <FormRowVertical label="Password" :error="errors.password">
      <FormInput
        type="password"
        id="password"
        :disabled="isLoading"
        v-model="password"
        v-bind="passwordAttrs"
      />
    </FormRowVertical>

    <FormRowVertical>
      <SharedButton size="large" :disabled="isLoading">
        <SpinnerMini v-if="isLoading" />
        {{ !isLoading ? 'Log in' : '' }}
      </SharedButton>
    </FormRowVertical>
  </MainForm>
</template>
