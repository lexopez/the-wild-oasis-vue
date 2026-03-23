<script setup>
import AppMenusMenu from '@/components/AppMenusMenu.vue'
import AppModal from '@/components/AppModal.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'
import MenusButton from '@/components/MenusButton.vue'
import MenusList from '@/components/MenusList.vue'
import MenusToggle from '@/components/MenusToggle.vue'
import ModalWindow from '@/components/ModalWindow.vue'
import { formatCurrency } from '@/utils/helpers'

import { Square2StackIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useDeleteCabin } from './useDeleteCabin'
import { useCreateCabin } from './useCreateCabin'
import CreateCabinForm from './CreateCabinForm.vue'

const props = defineProps({
  cabin: {
    type: Object,
    required: true,
  },
})
const childRef = ref(null)
const { isDeleting, deleteCabin } = useDeleteCabin()
const { isCreating, createCabin } = useCreateCabin()

const handleDuplicate = () => {
  createCabin({
    name: `Copy of ${props.cabin.name}`,
    maxCapacity: props.cabin.maxCapacity,
    regularPrice: props.cabin.regularPrice,
    discount: props.cabin.discount,
    image: props.cabin.image,
    description: props.cabin.description,
  })
}
</script>

<template v-if="cabin">
  <img :src="cabin.image" alt="cabin image" class="img" />
  <div class="cabin">{{ cabin.name }}</div>
  <div>Fits up to {{ cabin.maxCapacity }} guests</div>
  <div class="price">
    {{ formatCurrency(cabin.regularPrice) }}
  </div>
  <div class="discount" v-if="cabin.discount">{{ formatCurrency(cabin.discount) }}</div>
  <span v-else>&mdash;</span>
  <div>
    <AppModal ref="childRef">
      <AppMenusMenu>
        <MenusToggle :id="cabin.id" />
        <MenusList :id="cabin.id">
          <MenusButton :icon="Square2StackIcon" @click="handleDuplicate">Duplicate</MenusButton>

          <MenusButton :icon="PencilIcon" @click="childRef.open('edit')">Edit</MenusButton>

          <MenusButton :icon="TrashIcon" @click="childRef.open('delete')">Delete</MenusButton>
        </MenusList>
        <ModalWindow name="edit">
          <CreateCabinForm :cabin-to-edit="cabin" />
        </ModalWindow>
        <ModalWindow name="delete">
          <ConfirmDelete resource-name="cabin" @confirm="deleteCabin(cabin.id)" />
        </ModalWindow>
      </AppMenusMenu>
    </AppModal>
  </div>
</template>

<style scoped>
.img {
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
}

.cabin {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
}

.price {
  font-family: 'Sono';
  font-weight: 600;
}

.discount {
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
}
</style>
