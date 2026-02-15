<template>
  <section class="relative py-20 px-4 text-center overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" class="w-full h-full text-gold-500">
          <path d="M50 0 C60 30, 90 40, 100 50 C90 60, 60 70, 50 100 C40 70, 10 60, 0 50 C10 40, 40 30, 50 0Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="absolute bottom-0 right-0 w-32 h-32 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" class="w-full h-full text-gold-500">
          <path d="M50 0 C60 30, 90 40, 100 50 C90 60, 60 70, 50 100 C40 70, 10 60, 0 50 C10 40, 40 30, 50 0Z" fill="currentColor"/>
        </svg>
      </div>
    </div>

    <div class="relative z-10 max-w-2xl mx-auto">
      <!-- Bismillah -->
      <p class="text-sm tracking-[0.3em] uppercase text-gold-600 mb-6 animate-fade-in">
        Bismillahirrahmanirrahim
      </p>

      <!-- Decorative line -->
      <div class="flex items-center justify-center gap-4 mb-10 animate-fade-in" style="animation-delay: 0.2s;">
        <div class="h-px w-16 bg-gradient-to-r from-transparent to-gold-400"></div>
        <svg class="w-6 h-6 text-gold-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div class="h-px w-16 bg-gradient-to-l from-transparent to-gold-400"></div>
      </div>

      <!-- Groom -->
      <div class="mb-6 animate-fade-in-up" style="animation-delay: 0.4s;">
        <h2 class="font-script text-5xl md:text-6xl text-gold-700 mb-2">{{ config.groom.name }}</h2>
        <p class="font-body text-sm text-gray-500">{{ config.groom.parent }}</p>
      </div>

      <!-- & Symbol -->
      <div class="my-8 animate-scale-in" style="animation-delay: 0.6s;">
        <span class="font-script text-6xl text-blush-500">&</span>
      </div>

      <!-- Bride -->
      <div class="mb-8 animate-fade-in-up" style="animation-delay: 0.8s;">
        <h2 class="font-script text-5xl md:text-6xl text-gold-700 mb-2">{{ config.bride.name }}</h2>
        <p class="font-body text-sm text-gray-500">{{ config.bride.parent }}</p>
      </div>

      <!-- Quote -->
      <div class="mt-12 animate-fade-in" style="animation-delay: 1s;">
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gold-100 shadow-sm">
          <p class="font-display text-sm md:text-base italic text-gray-600 leading-relaxed">
            {{ config.quote }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useWeddingConfig()
</script>
