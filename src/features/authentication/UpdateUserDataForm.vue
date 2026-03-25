<script setup>
import { object, string } from 'yup'

import FormInput from '@/components/FormInput.vue'
import FormRow from '@/components/FormRow.vue'
import MainForm from '@/components/MainForm.vue'
import { useForm } from 'vee-validate'
import SharedButton from '@/components/SharedButton.vue'
import FormFileInput from '@/components/FormFileInput.vue'
import { useUser } from './useUser'
import AppSpinner from '@/components/AppSpinner.vue'
import { watch } from 'vue'
import { useUpdateUser } from './useUpdateUser'
import SpinnerMini from '@/components/SpinnerMini.vue'

const { user, isLoading } = useUser()
const { updateUser, isUpdating } = useUpdateUser()

const schema = object({
  email: string().required('This field is required').email('Please provide a valid email address'),
  fullName: string().required('This field is required'),
})

const { errors, handleSubmit, resetForm, defineField, setFieldValue } = useForm({
  validationSchema: schema,
  // We'll handle the re-initialization manually for better control
  initialValues: {
    email: user.value?.email || '',
    fullName: user.value?.user_metadata?.fullName || '',
  },
})

// 1. Watch the user object for changes
// When the user is fetched or updated, "reset" the form to these new values
watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      resetForm({
        values: {
          email: newUser.email,
          fullName: newUser.user_metadata?.fullName || '',
        },
      })
    }
  },
  { immediate: true }, // Run immediately in case data is already there
)

const [email, emailAttrs] = defineField('email')
const [fullName, fullNameAttrs] = defineField('fullName')

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) setFieldValue('avatar', file)
}

// 2. Fix the Cancel Button
const handleCancel = () => {
  // resetForm() without arguments reverts to the LAST set initial values

  resetForm({
    values: {
      email: user.value.email,
      fullName: user.value.user_metadata?.fullName,
    },
  })
}

const onSubmit = handleSubmit((values) => {
  updateUser(values, {
    onSuccess: ({ user }) => {
      // 3. IMPORTANT: If your mutation returns the new user,
      // reset the form to the NEW data so "Cancel" doesn't go back to old data
      resetForm({
        values: {
          email: user.email,
          fullName: user.user_metadata?.fullName,
        },
      })
    },
  })
})
</script>

<template>
  <AppSpinner v-if="isLoading" />
  <MainForm v-else @submit="onSubmit">
    <FormRow label="Email address" :error="errors.email">
      <FormInput type="email" id="email" :disabled="true" v-model="email" v-bind="emailAttrs" />
    </FormRow>
    <FormRow label="Full name" :error="errors.fullName">
      <FormInput type="text" v-bind="fullNameAttrs" v-model="fullName" :disabled="isUpdating" />
    </FormRow>
    <FormRow label="Cabin photo" :error="errors.image">
      <FormFileInput
        id="avatar"
        accept="image/*"
        :disabled="isUpdating"
        @change="handleFileChange"
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
      <SharedButton :disabled="isUpdating">
        <SpinnerMini v-if="isUpdating" />
        {{ !isUpdating ? 'Update account' : '' }}
      </SharedButton>
    </FormRow>
  </MainForm>
</template>
