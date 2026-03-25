<script setup>
import { object, string, ref as yupRef } from 'yup'
import { useForm } from 'vee-validate'
import { useUpdateUser } from './useUpdateUser'

import FormRow from '@/components/FormRow.vue'
import FormInput from '@/components/FormInput.vue'
import SharedButton from '@/components/SharedButton.vue'
import MainForm from '@/components/MainForm.vue'

const { updateUser, isUpdating } = useUpdateUser()

// 1. Define the Validation Schema
const schema = object({
  password: string()
    .required('This field is required')
    .min(8, 'Password needs a minimum of 8 characters'),
  passwordConfirm: string()
    .required('This field is required')
    // yupRef('password') mimics the React getValues().password logic
    .oneOf([yupRef('password')], 'Passwords need to match'),
})

// 2. Setup the Form
const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema,
})

const [password, passwordAttrs] = defineField('password')
const [passwordConfirm, passwordConfirmAttrs] = defineField('passwordConfirm')

// 3. Handle Submission
const onSubmit = handleSubmit(({ password }) => {
  updateUser(
    { password },
    {
      onSuccess: () => {
        resetForm()
      },
    },
  )
})

const handleCancel = () => {
  resetForm()
}
</script>

<template>
  <MainForm @submit="onSubmit">
    <FormRow label="New password (min 8 chars)" :error="errors.password">
      <FormInput
        type="password"
        id="password"
        autocomplete="current-password"
        :disabled="isUpdating"
        v-model="password"
        v-bind="passwordAttrs"
      />
    </FormRow>

    <FormRow label="Confirm password" :error="errors.passwordConfirm">
      <FormInput
        type="password"
        id="passwordConfirm"
        autocomplete="new-password"
        :disabled="isUpdating"
        v-model="passwordConfirm"
        v-bind="passwordConfirmAttrs"
      />
    </FormRow>

    <FormRow>
      <SharedButton
        type="button"
        variation="secondary"
        :disabled="isUpdating"
        @click="handleCancel"
      >
        Cancel
      </SharedButton>
      <SharedButton :disabled="isUpdating"> Update password </SharedButton>
    </FormRow>
  </MainForm>
</template>
