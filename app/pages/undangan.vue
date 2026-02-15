<template>
  <div class="min-h-screen bg-cream">
    <!-- Opening animation overlay -->
    <Transition name="curtain">
      <div
        v-if="showOpening"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-cream via-cream-dark to-cream"
        @click="closeOpening"
      >
        <div class="text-center px-6 animate-fade-in">
          <p class="text-sm tracking-[0.3em] uppercase text-gold-600 mb-6">Undangan Pernikahan</p>
          <h1 class="font-script text-5xl md:text-7xl text-gold-700 mb-2">{{ config.groom.name }}</h1>
          <span class="font-script text-5xl text-blush-500 block my-4">&</span>
          <h1 class="font-script text-5xl md:text-7xl text-gold-700 mb-8">{{ config.bride.name }}</h1>

          <div class="mb-8">
            <p class="font-body text-gray-600 mb-1">Kepada Yth.</p>
            <p class="font-display text-2xl font-semibold text-gray-800">{{ guestName }}</p>
          </div>

          <button
            @click="closeOpening"
            class="px-8 py-3 rounded-full font-body font-medium text-white bg-gradient-to-r from-gold-600 to-gold-500 shadow-lg shadow-gold-200/50 hover:shadow-gold-300/50 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-float"
          >
            Buka Undangan 💌
          </button>
        </div>
      </div>
    </Transition>

    <!-- Main invitation content -->
    <div v-show="!showOpening">
      <!-- Hero section -->
      <div class="relative bg-gradient-to-b from-cream-dark to-cream py-10">
        <div class="text-center px-4 animate-fade-in">
          <p class="text-sm tracking-[0.3em] uppercase text-gold-600 mb-2">Kepada Yth.</p>
          <p class="font-display text-2xl font-semibold text-gray-800 mb-1">{{ guestName }}</p>
          <p class="font-body text-sm text-gray-500">Anda diundang untuk menghadiri pernikahan kami</p>
        </div>
      </div>

      <!-- Couple Hero -->
      <CoupleHero />

      <!-- Divider -->
      <div class="flex items-center justify-center py-4">
        <div class="h-px w-16 bg-gold-200"></div>
        <svg class="w-4 h-4 mx-3 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div class="h-px w-16 bg-gold-200"></div>
      </div>

      <!-- Love Story -->
      <LoveStory />

      <!-- Divider -->
      <div class="flex items-center justify-center py-4">
        <div class="h-px w-16 bg-gold-200"></div>
        <svg class="w-4 h-4 mx-3 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div class="h-px w-16 bg-gold-200"></div>
      </div>

      <!-- Event Details -->
      <EventDetails />

      <!-- Divider -->
      <div class="flex items-center justify-center py-4">
        <div class="h-px w-16 bg-gold-200"></div>
        <svg class="w-4 h-4 mx-3 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div class="h-px w-16 bg-gold-200"></div>
      </div>

      <!-- Countdown Timer -->
      <CountdownTimer @completed="onCountdownCompleted" />

      <!-- QR Code - shown after countdown -->
      <div v-if="showQr && guestName && guestPhone">
        <div class="flex items-center justify-center py-4">
          <div class="h-px w-16 bg-gold-200"></div>
          <svg class="w-4 h-4 mx-3 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div class="h-px w-16 bg-gold-200"></div>
        </div>
        <QrDisplay :guest-name="guestName" :guest-phone="guestPhone" />
      </div>

      <!-- Footer -->
      <footer class="py-10 text-center bg-gradient-to-t from-cream-dark to-cream">
        <div class="mb-6">
          <p class="font-display text-base text-gray-600 mb-2">Merupakan suatu kehormatan dan kebahagiaan</p>
          <p class="font-display text-base text-gray-600">apabila Bapak/Ibu/Saudara/i berkenan hadir</p>
        </div>
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="h-px w-12 bg-gold-300"></div>
          <div class="w-2 h-2 rounded-full bg-gold-400"></div>
          <div class="h-px w-12 bg-gold-300"></div>
        </div>
        <p class="font-script text-3xl text-gold-700 mb-2">{{ config.groom.name }} & {{ config.bride.name }}</p>
        <p class="font-body text-xs text-gray-400 mt-4">Undangan Pernikahan Digital</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useWeddingConfig()

const showOpening = ref(true)
const showQr = ref(false)
const guestName = ref('')
const guestPhone = ref('')

onMounted(() => {
  // Retrieve guest data from localStorage
  guestName.value = localStorage.getItem('guest_name') || 'Tamu Undangan'
  guestPhone.value = localStorage.getItem('guest_phone') || ''

  // Check if event date has passed — if so, show QR immediately
  const now = new Date()
  if (config.event.date.getTime() <= now.getTime()) {
    showQr.value = true
  }
})

const closeOpening = () => {
  showOpening.value = false
}

const onCountdownCompleted = () => {
  showQr.value = true
}
</script>

<style scoped>
.curtain-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.curtain-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
