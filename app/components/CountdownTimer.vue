<template>
  <section class="py-16 px-4">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Section title -->
      <div class="mb-10">
        <h3 class="font-script text-4xl text-gold-700 mb-2">Menuju Hari Bahagia</h3>
        <div class="flex items-center justify-center gap-3">
          <div class="h-px w-12 bg-gold-300"></div>
          <div class="w-2 h-2 rounded-full bg-gold-400"></div>
          <div class="h-px w-12 bg-gold-300"></div>
        </div>
      </div>

      <!-- Countdown -->
      <div v-if="!isCompleted" class="grid grid-cols-4 gap-3 md:gap-6 max-w-md mx-auto">
        <div
          v-for="unit in units"
          :key="unit.label"
          class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gold-100 shadow-sm"
        >
          <div class="font-display text-3xl md:text-4xl font-bold text-gold-700 mb-1">
            {{ String(unit.value).padStart(2, '0') }}
          </div>
          <div class="font-body text-xs md:text-sm text-gray-500 uppercase tracking-wider">
            {{ unit.label }}
          </div>
        </div>
      </div>

      <!-- Completed message -->
      <div v-else class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gold-100 shadow-sm max-w-md mx-auto">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blush-50 flex items-center justify-center">
          <svg class="w-8 h-8 text-blush-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <p class="font-display text-xl text-gray-800 font-semibold mb-2">Hari Bahagia Telah Tiba!</p>
        <p class="font-body text-sm text-gray-500">Terima kasih atas doa dan kehadiran Anda</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  completed: []
}>()

const config = useWeddingConfig()
const now = ref(new Date())
const isCompleted = ref(false)

const units = computed(() => {
  const diff = config.event.date.getTime() - now.value.getTime()

  if (diff <= 0) {
    return [
      { label: 'Hari', value: 0 },
      { label: 'Jam', value: 0 },
      { label: 'Menit', value: 0 },
      { label: 'Detik', value: 0 },
    ]
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ]
})

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
    const diff = config.event.date.getTime() - now.value.getTime()
    if (diff <= 0 && !isCompleted.value) {
      isCompleted.value = true
      emit('completed')
      clearInterval(timer)
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
