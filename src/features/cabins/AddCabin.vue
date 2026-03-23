<script setup>
import AppModal from '@/components/AppModal.vue'
import ModalWindow from '@/components/ModalWindow.vue'
import { ref } from 'vue'
import SharedButton from '@/components/SharedButton.vue'
import CreateCabinForm from './CreateCabinForm.vue'

const childRef = ref(null)
</script>

<template>
  <div>
    <AppModal ref="childRef">
      <SharedButton type="primary" @click="childRef.open('cabin-form')">Add new Cabin</SharedButton>

      <ModalWindow name="cabin-form">
        <CreateCabinForm formType="modal" />
      </ModalWindow>
    </AppModal>
  </div>
</template>
