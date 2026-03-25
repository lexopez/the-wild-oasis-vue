<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { useSignup } from './useSignup'
import MainForm from '@/components/MainForm.vue'
import FormRow from '@/components/FormRow.vue'
import FormInput from '@/components/FormInput.vue'
import SharedButton from '@/components/SharedButton.vue'

const { signup, isLoading } = useSignup()

// 1. Define the Validation Schema with Yup
const schema = yup.object({
  fullName: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('This field is required')
    .email('Please provide a valid email address')
    // If you prefer the specific regex from your React code:
    .matches(/\S+@\S+\.\S+/, 'Please provide a valid email address'),
  password: yup
    .string()
    .required('This field is required')
    .min(8, 'Password needs a minimum of 8 characters'),
  passwordConfirm: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password')], 'Passwords need to match'),
})

// 2. Initialize the Form
const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema,
})

// 3. Define Fields (v-model and attributes for blur/input tracking)
const [fullName, fullNameAttrs] = defineField('fullName')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm')

const onSubmit = handleSubmit(({ fullName, email, password }) => {
  signup(
    { fullName, email, password },
    {
      onSettled: () => resetForm(),
    },
  )
})

function handleReset() {
  resetForm()
}
</script>

<template>
  <MainForm @submit="onSubmit">
    <FormRow label="Full name" :error="errors.fullName">
      <FormInput
        type="text"
        id="fullName"
        :disabled="isLoading"
        v-model="fullName"
        v-bind="fullNameAttrs"
      />
    </FormRow>

    <FormRow label="Email address" :error="errors.email">
      <FormInput
        type="email"
        id="email"
        :disabled="isLoading"
        v-model="email"
        v-bind="emailAttrs"
      />
    </FormRow>

    <FormRow label="Password (min 8 characters)" :error="errors.password">
      <FormInput
        type="password"
        id="password"
        :disabled="isLoading"
        v-model="password"
        v-bind="passwordAttrs"
      />
    </FormRow>

    <FormRow label="Repeat password" :error="errors.passwordConfirm">
      <FormInput
        type="password"
        id="passwordConfirm"
        :disabled="isLoading"
        v-model="passwordConfirm"
        v-bind="passwordConfirmAttrs"
      />
    </FormRow>

    <FormRow>
      <SharedButton variation="secondary" type="reset" :disabled="isLoading" @click="handleReset">
        Cancel
      </SharedButton>
      <SharedButton :disabled="isLoading">Create new user</SharedButton>
    </FormRow>
  </MainForm>
</template>
