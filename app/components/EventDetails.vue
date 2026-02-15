<template>
  <section class="py-16 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Section title -->
      <div class="text-center mb-12">
        <h3 class="font-script text-4xl text-gold-700 mb-2">Acara Pernikahan</h3>
        <div class="flex items-center justify-center gap-3">
          <div class="h-px w-12 bg-gold-300"></div>
          <div class="w-2 h-2 rounded-full bg-gold-400"></div>
          <div class="h-px w-12 bg-gold-300"></div>
        </div>
      </div>

      <!-- Event cards -->
      <div class="grid md:grid-cols-2 gap-6 mb-10">
        <!-- Akad -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gold-100 shadow-sm text-center hover:shadow-md transition-all duration-300">
          <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-50 flex items-center justify-center">
            <svg class="w-7 h-7 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
            </svg>
          </div>
          <h4 class="font-display text-xl font-semibold text-gray-800 mb-2">Akad Nikah</h4>
          <p class="font-body text-gold-600 font-medium mb-1">{{ config.event.akadTime }}</p>
          <p class="font-body text-sm text-gray-500">{{ formattedDate }}</p>
        </div>

        <!-- Resepsi -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gold-100 shadow-sm text-center hover:shadow-md transition-all duration-300">
          <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-blush-50 flex items-center justify-center">
            <svg class="w-7 h-7 text-blush-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </div>
          <h4 class="font-display text-xl font-semibold text-gray-800 mb-2">Resepsi</h4>
          <p class="font-body text-blush-600 font-medium mb-1">{{ config.event.resepsiTime }}</p>
          <p class="font-body text-sm text-gray-500">{{ formattedDate }}</p>
        </div>
      </div>

      <!-- Venue -->
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gold-100 shadow-sm mb-6">
        <div class="text-center mb-4">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-sage-50 flex items-center justify-center">
            <svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
            </svg>
          </div>
          <h4 class="font-display text-lg font-semibold text-gray-800 mb-1">{{ config.event.venue }}</h4>
          <p class="font-body text-sm text-gray-500">{{ config.event.address }}</p>
        </div>
      </div>

      <!-- Map -->
      <div class="rounded-2xl overflow-hidden border border-gold-100 shadow-sm">
        <iframe
          :src="config.event.mapEmbedUrl"
          width="100%"
          height="300"
          style="border:0;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useWeddingConfig()

const formattedDate = computed(() => {
  return config.event.date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>
