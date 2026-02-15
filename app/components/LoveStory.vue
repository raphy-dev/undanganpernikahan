<template>
  <section class="py-16 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Section title -->
      <div class="text-center mb-12">
        <h3 class="font-script text-4xl text-gold-700 mb-2">Kisah Kami</h3>
        <div class="flex items-center justify-center gap-3">
          <div class="h-px w-12 bg-gold-300"></div>
          <div class="w-2 h-2 rounded-full bg-gold-400"></div>
          <div class="h-px w-12 bg-gold-300"></div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-200 via-gold-400 to-gold-200 md:-translate-x-px"></div>

        <div
          v-for="(item, index) in config.story"
          :key="index"
          class="relative mb-12 last:mb-0"
        >
          <!-- Timeline dot -->
          <div
            class="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-gold-500 border-2 border-cream shadow-md -translate-x-1.5 md:-translate-x-1.5 top-1 z-10"
          ></div>

          <!-- Content card -->
          <div
            :class="[
              'ml-10 md:ml-0 md:w-[calc(50%-2rem)]',
              index % 2 === 0 ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'
            ]"
          >
            <div class="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-gold-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <span class="inline-block px-3 py-1 bg-gold-50 rounded-full text-xs font-body font-medium text-gold-700 mb-2">
                {{ item.date }}
              </span>
              <h4 class="font-display text-lg font-semibold text-gray-800 mb-2">{{ item.title }}</h4>
              <p class="font-body text-sm text-gray-600 leading-relaxed">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useWeddingConfig()
</script>
