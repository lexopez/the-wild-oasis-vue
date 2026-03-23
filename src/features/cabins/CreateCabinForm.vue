<script setup>
import { computed, inject } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import FormRow from '@/components/FormRow.vue'
import FormInput from '@/components/FormInput.vue'
import MainForm from '@/components/MainForm.vue'
import SharedButton from '@/components/SharedButton.vue'
import FormTextarea from '@/components/FormTextarea.vue'
import FormFileInput from '@/components/FormFileInput.vue'

import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

const props = defineProps({
  cabinToEdit: {
    type: Object,
    default: () => ({}),
  },
  formType: String,
})
const { close } = inject('modalContext')
const { isCreating, createCabin } = useCreateCabin()
const { isEditing, editCabin } = useEditCabin()
const isWorking = computed(() => isCreating?.value || isEditing?.value)

const { id: editId, ...editValues } = props.cabinToEdit
const isEditSession = Boolean(editId)

// 1. Define Validation Schema (Yup)
const schema = yup.object({
  name: yup.string().required('This field is required'),
  maxCapacity: yup
    .number()
    .required('This field is required')
    .min(1, 'Capacity should be at least 1'),
  regularPrice: yup
    .number()
    .required('This field is required')
    .min(1, 'Price should be at least 1'),
  discount: yup
    .number()
    .required('This field is required')
    .test('is-less-than-price', 'Discount should be less than regular price', function (value) {
      return value <= this.parent.regularPrice
    }),
  description: yup.string().required('This field is required'),
  image: isEditSession ? yup.mixed() : yup.mixed().required('This field is required'),
})

// 2. Initialize Form
const { errors, handleSubmit, resetForm, defineField, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: isEditSession ? editValues : {},
})

const [name, nameAttrs] = defineField('name')
const [maxCapacity, maxCapacityAttrs] = defineField('maxCapacity')
const [regularPrice, regularPriceAttrs] = defineField('regularPrice')
const [discount, discountAttrs] = defineField('discount')
const [description, descriptionAttrs] = defineField('description')

function handleFileChange(event) {
  const file = event.target.files[0]
  setFieldValue('image', file)
}

const onSubmit = handleSubmit((values) => {
  const image = typeof values.image === 'string' ? values.image : values.image

  if (isEditSession) {
    editCabin(
      { newCabinData: { ...values, image, id: editId } },
      {
        onSuccess: () => {
          resetForm()
          close()
        },
      },
    )
  } else {
    createCabin(
      { ...values, image },
      {
        onSuccess: () => {
          resetForm()
          close()
        },
      },
    )
  }
})
</script>

<template>
  <MainForm @submit="onSubmit" :type="formType">
    <FormRow label="Cabin name" :error="errors.name" id="name">
      <FormInput type="text" id="name" :disabled="isWorking" v-model="name" v-bind="nameAttrs" />
    </FormRow>

    <FormRow label="Maximum capacity" :error="errors.maxCapacity">
      <FormInput
        type="number"
        id="maxCapacity"
        :disabled="isWorking"
        v-model.number="maxCapacity"
        v-bind="maxCapacityAttrs"
      />
    </FormRow>

    <FormRow label="Regular price" :error="errors.regularPrice">
      <FormInput
        type="number"
        id="regularPrice"
        :disabled="isWorking"
        v-model.number="regularPrice"
        v-bind="regularPriceAttrs"
      />
    </FormRow>

    <FormRow label="Discount" :error="errors.discount">
      <FormInput
        type="number"
        id="discount"
        :disabled="isWorking"
        v-model.number="discount"
        v-bind="discountAttrs"
      />
    </FormRow>

    <FormRow label="Description for website" :error="errors.description">
      <FormTextarea
        id="description"
        :disabled="isWorking"
        v-model="description"
        v-bind="descriptionAttrs"
      />
    </FormRow>

    <FormRow label="Cabin photo" :error="errors.image">
      <FormFileInput id="image" accept="image/*" :disabled="isWorking" @change="handleFileChange" />
    </FormRow>

    <FormRow>
      <SharedButton variation="secondary" type="reset" @click="close"> Cancel </SharedButton>
      <SharedButton :disabled="isCreating || isEditing">
        {{
          isEditSession
            ? isEditing
              ? 'Updating...'
              : 'Edit cabin'
            : isCreating
              ? 'Creating...'
              : 'Create new cabins'
        }}
      </SharedButton>
    </FormRow>
  </MainForm>
</template>
