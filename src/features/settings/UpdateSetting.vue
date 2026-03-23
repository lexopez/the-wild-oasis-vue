<script setup>
import AppSpinner from '@/components/AppSpinner.vue'
import { useSettings } from './useSettings'
import MainForm from '@/components/MainForm.vue'
import FormRow from '@/components/FormRow.vue'
import FormInput from '@/components/FormInput.vue'
import { useUpdateSetting } from './useUpdateSettings'
import { ref } from 'vue'
import { watch } from 'vue'

const { isLoading, data: settings } = useSettings()
const { isUpdating, updateSetting } = useUpdateSetting()

const minBookingLength = ref('')
const maxBookingLength = ref('')
const maxGuestsPerBooking = ref('')
const breakfastPrice = ref('')

// If settings are loaded asynchronously:
watch(
  settings,
  (newSettings) => {
    if (newSettings) {
      minBookingLength.value = newSettings.minBookingLength
      maxBookingLength.value = newSettings.maxBookingLength
      maxGuestsPerBooking.value = newSettings.maxGuestsPerBooking
      breakfastPrice.value = newSettings.breakfastPrice
    }
  },
  { immediate: true },
)

function handleUpdate(e, field) {
  const { value } = e.target

  if (!value) return

  // We send an object with the dynamic key name
  updateSetting({ [field]: value })
}
</script>
<template>
  <AppSpinner v-if="isLoading" />

  <MainForm v-else>
    <FormRow label="Minimum nights/booking">
      <FormInput
        type="number"
        id="min-nights"
        :disabled="isUpdating"
        :default-value="settings.minBookingLength"
        v-model="minBookingLength"
        @blur="(e) => handleUpdate(e, 'minBookingLength')"
      />
    </FormRow>

    <FormRow label="Maximum nights/booking">
      <FormInput
        type="number"
        id="max-nights"
        :disabled="isUpdating"
        v-model="maxBookingLength"
        @blur="(e) => handleUpdate(e, 'maxBookingLength')"
      />
    </FormRow>

    <FormRow label="Maximum guests/booking">
      <FormInput
        type="number"
        id="max-guests"
        :disabled="isUpdating"
        v-model="maxGuestsPerBooking"
        @blur="(e) => handleUpdate(e, 'maxGuestsPerBooking')"
      />
    </FormRow>

    <FormRow label="Breakfast price">
      <FormInput
        type="number"
        id="breakfast-price"
        :disabled="isUpdating"
        v-model="breakfastPrice"
        @blur="(e) => handleUpdate(e, 'breakfastPrice')"
      />
    </FormRow>
  </MainForm>
</template>
