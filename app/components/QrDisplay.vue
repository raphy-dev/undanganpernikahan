<template>
  <section class="py-16 px-4">
    <div class="max-w-sm mx-auto text-center">
      <!-- Section title -->
      <div class="mb-8">
        <h3 class="font-script text-4xl text-gold-700 mb-2">QR Code Anda</h3>
        <p class="font-body text-sm text-gray-500">Tunjukkan QR code ini kepada resepsionis saat hadir</p>
      </div>

      <!-- QR Code Card -->
      <div class="bg-white rounded-2xl p-6 border border-gold-100 shadow-lg">
        <div class="bg-white p-4 rounded-xl mb-4 inline-block">
          <canvas ref="qrCanvas" class="mx-auto"></canvas>
        </div>
        <div class="border-t border-gold-100 pt-4">
          <p class="font-display text-lg font-semibold text-gray-800">{{ guestName }}</p>
          <p class="font-body text-sm text-gray-500">{{ guestPhone }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'

const props = defineProps<{
  guestName: string
  guestPhone: string
}>()

const qrCanvas = ref<HTMLCanvasElement | null>(null)

const qrData = computed(() => {
  return btoa(`${props.guestName}|${props.guestPhone}`)
})

const renderQR = async () => {
  if (!qrCanvas.value) return
  try {
    await QRCode.toCanvas(qrCanvas.value, qrData.value, {
      width: 200,
      margin: 2,
      color: {
        dark: '#5E4A1A',
        light: '#FFFFFF',
      },
    })
  } catch (err) {
    console.error('QR generation error:', err)
  }
}

onMounted(() => {
  renderQR()
})

watch(qrData, () => {
  renderQR()
})
</script>
