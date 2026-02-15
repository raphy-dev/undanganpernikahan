<template>
  <div class="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-10 left-10 w-40 h-40 bg-blush-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-56 h-56 bg-gold-200/20 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush-100/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-10 animate-fade-in">
        <p class="text-sm tracking-[0.3em] uppercase text-gold-600 mb-4">Undangan Pernikahan</p>
        <h1 class="font-script text-5xl md:text-6xl text-gold-700 mb-2">{{ config.groom.name }}</h1>
        <span class="font-script text-4xl text-blush-500 block my-2">&</span>
        <h1 class="font-script text-5xl md:text-6xl text-gold-700">{{ config.bride.name }}</h1>
        <p class="font-body text-sm text-gray-500 mt-4">{{ formattedDate }}</p>
      </div>

      <!-- Decorative divider -->
      <div class="flex items-center justify-center gap-4 mb-10 animate-fade-in" style="animation-delay: 0.3s;">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent to-gold-300"></div>
        <svg class="w-5 h-5 text-gold-400 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div class="h-px flex-1 bg-gradient-to-l from-transparent to-gold-300"></div>
      </div>

      <!-- Form Card -->
      <div class="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-gold-100 shadow-xl animate-fade-in-up" style="animation-delay: 0.5s;">
        <div class="text-center mb-6">
          <h2 class="font-display text-xl font-semibold text-gray-800 mb-1">Selamat Datang</h2>
          <p class="font-body text-sm text-gray-500">Silakan masukkan data Anda untuk melihat undangan</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Nama -->
          <div>
            <label for="name" class="block font-body text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              placeholder="Masukkan nama lengkap Anda"
              class="w-full px-4 py-3 rounded-xl border border-gold-200 bg-cream/50 font-body text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300 transition-all duration-200"
            />
          </div>

          <!-- Nomor HP -->
          <div>
            <label for="phone" class="block font-body text-sm font-medium text-gray-700 mb-2">Nomor HP</label>
            <input
              id="phone"
              v-model="phone"
              type="tel"
              required
              placeholder="Contoh: 08123456789"
              class="w-full px-4 py-3 rounded-xl border border-gold-200 bg-cream/50 font-body text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-300 transition-all duration-200"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!name || !phone"
            class="w-full py-3.5 rounded-xl font-body font-medium text-white bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg shadow-gold-200/50 hover:shadow-gold-300/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            ✨ Lihat Undangan
          </button>
        </form>
      </div>

      <!-- Footer note -->
      <p class="text-center font-body text-xs text-gray-400 mt-6 animate-fade-in" style="animation-delay: 0.8s;">
        Data Anda hanya digunakan untuk keperluan undangan
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useWeddingConfig()
const router = useRouter()

const name = ref('')
const phone = ref('')

const formattedDate = computed(() => {
  return config.event.date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const handleSubmit = () => {
  if (!name.value || !phone.value) return

  // Generate QR data (base64 of name|phone)
  const qrData = btoa(`${name.value}|${phone.value}`)

  // Save to localStorage
  localStorage.setItem('guest_name', name.value)
  localStorage.setItem('guest_phone', phone.value)
  localStorage.setItem('guest_qr', qrData)

  // Navigate to invitation page
  router.push('/undangan')
}
</script>
