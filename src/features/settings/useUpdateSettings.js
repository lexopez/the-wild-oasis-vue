import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { updateSetting as updateSettingApi } from '@/services/apiSettings'
import { watch, watchEffect } from 'vue'

export function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting successfully edited')
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isUpdating, updateSetting }
}
