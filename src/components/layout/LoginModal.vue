<script setup lang="ts">
import { generateQRCode, generateQRCodeKey } from '~/apis/auth'

const model = defineModel<boolean>()

const { data: qrCode, run: getQRCode } = useRequest(generateQRCode, {
  manual: true,
})

const { data: _ } = useRequest(generateQRCodeKey, {
  onSuccess(data) {
    getQRCode(data.data.unikey)
  },
})
</script>

<template>
  <a-modal v-model:open="model" width="375px" destroy-on-close>
    <template #closeIcon>
      <div flex="~ justify-center items-center" pl-1px pt-1px>
        <div i-carbon-close-large />
      </div>
    </template>
    <div flex="~ col items-center justify-center gap-y-8" py-14>
      <p text="xl" font="bold">
        扫码登录
      </p>
      <div>
        <a-qrcode
          v-if="qrCode?.data.qrurl"
          :value="qrCode?.data.qrurl"
          :size="190"
        />
      </div>
      <p cursor-default>
        <span text="red-300" mr-1>网易云音乐APP</span>扫码登录
      </p>
    </div>
    <template #footer />
  </a-modal>
</template>
