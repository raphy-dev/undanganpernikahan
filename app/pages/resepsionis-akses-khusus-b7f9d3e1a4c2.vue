<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <!-- Header -->
    <header class="bg-gray-900 border-b border-gray-800 px-4 py-4">
      <div class="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <h1 class="font-display text-lg font-semibold text-gold-400">Resepsionis</h1>
          <p class="font-body text-xs text-gray-500">Panel Scan QR Tamu Undangan</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="font-body text-xs text-gray-400">Aktif</span>
        </div>
      </div>
    </header>

    <div class="max-w-2xl mx-auto px-4 py-6">
      <!-- Scanner Section -->
      <div class="mb-8">
        <div class="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-body text-sm font-medium text-gray-300">Scan QR Code</h2>
            <button
              @click="toggleScanner"
              :class="[
                'px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200',
                scannerActive
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-gold-500/20 text-gold-400 hover:bg-gold-500/30'
              ]"
            >
              {{ scannerActive ? '⏹ Stop Scanner' : '📷 Mulai Scan' }}
            </button>
          </div>

          <!-- Camera error message -->
          <div v-if="cameraError" class="rounded-xl p-4 bg-yellow-500/10 border border-yellow-500/30 mb-4">
            <p class="font-body text-sm text-yellow-400 font-medium mb-1">⚠️ Kamera tidak bisa diakses</p>
            <p class="font-body text-xs text-yellow-400/70">{{ cameraError }}</p>
            <p class="font-body text-xs text-gray-500 mt-2">💡 Gunakan opsi "Upload QR" di bawah, atau buka halaman ini via HTTPS.</p>
          </div>

          <!-- Scanner container -->
          <div
            id="qr-reader"
            class="w-full rounded-xl overflow-hidden bg-gray-800"
            :class="{ 'min-h-[300px]': scannerActive }"
          ></div>
        </div>
      </div>

      <!-- Upload QR Image Fallback -->
      <div class="mb-8">
        <div class="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <h2 class="font-body text-sm font-medium text-gray-300 mb-4">Atau Upload Foto QR</h2>
          <label
            class="flex flex-col items-center justify-center w-full py-6 rounded-xl border-2 border-dashed border-gray-700 hover:border-gold-500/50 cursor-pointer transition-all duration-200 bg-gray-800/50"
          >
            <span class="text-3xl mb-2">📁</span>
            <span class="font-body text-sm text-gray-400">Tap untuk pilih foto QR code</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              class="hidden"
              @change="handleFileUpload"
            />
          </label>
        </div>
      </div>

      <!-- Scan Result -->
      <Transition name="slide">
        <div v-if="scanResult" class="mb-8">
          <div
            :class="[
              'rounded-2xl p-6 border transition-all duration-300',
              scanResult.valid
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            ]"
          >
            <div class="flex items-start gap-4">
              <div
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                  scanResult.valid ? 'bg-green-500/20' : 'bg-red-500/20'
                ]"
              >
                <span class="text-2xl">{{ scanResult.valid ? '✅' : '❌' }}</span>
              </div>
              <div class="flex-1">
                <h3
                  :class="[
                    'font-display text-lg font-semibold mb-1',
                    scanResult.valid ? 'text-green-400' : 'text-red-400'
                  ]"
                >
                  {{ scanResult.valid ? 'Tamu Valid' : 'Tamu Tidak Ditemukan' }}
                </h3>
                <p class="font-body text-sm text-gray-400 mb-1">Nama: <span class="text-white">{{ scanResult.name }}</span></p>
                <p class="font-body text-sm text-gray-400 mb-3">No HP: <span class="text-white">{{ scanResult.phone }}</span></p>

                <div v-if="scanResult.valid && !scanResult.alreadyCheckedIn">
                  <button
                    @click="checkInGuest"
                    :disabled="checkingIn"
                    class="px-6 py-2.5 rounded-xl font-body text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-600 shadow-lg transition-all duration-200"
                  >
                    {{ checkingIn ? 'Memproses...' : '✓ Check In Tamu' }}
                  </button>
                </div>
                <div v-else-if="scanResult.alreadyCheckedIn" class="flex items-center gap-2">
                  <span class="text-yellow-400">⚠️</span>
                  <span class="font-body text-sm text-yellow-400">Tamu sudah check-in sebelumnya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Check-in success message -->
      <Transition name="slide">
        <div v-if="checkInSuccess" class="mb-8">
          <div class="rounded-2xl p-4 bg-green-500/10 border border-green-500/30 text-center">
            <span class="text-3xl mb-2 block">🎉</span>
            <p class="font-body text-sm text-green-400 font-medium">Tamu berhasil di-check in!</p>
          </div>
        </div>
      </Transition>

      <!-- Manual Input Section -->
      <div class="mb-8">
        <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 class="font-body text-sm font-medium text-gray-300 mb-4">Atau Input Manual</h2>
          <form @submit.prevent="manualCheck" class="space-y-3">
            <input
              v-model="manualName"
              type="text"
              placeholder="Nama tamu"
              class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 font-body text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all"
            />
            <input
              v-model="manualPhone"
              type="tel"
              placeholder="Nomor HP"
              class="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 font-body text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all"
            />
            <button
              type="submit"
              :disabled="!manualName || !manualPhone"
              class="w-full py-3 rounded-xl font-body text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 disabled:bg-gray-700 disabled:text-gray-500 transition-all duration-200"
            >
              🔍 Cari Tamu
            </button>
          </form>
        </div>
      </div>

      <!-- Recent check-ins -->
      <div>
        <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 class="font-body text-sm font-medium text-gray-300 mb-4">Riwayat Check-in</h2>
          <div v-if="recentCheckIns.length === 0" class="text-center py-8">
            <span class="text-4xl mb-3 block">📋</span>
            <p class="font-body text-sm text-gray-500">Belum ada tamu yang check-in</p>
          </div>
          <div v-else class="space-y-2">
            <div
              v-for="(guest, index) in recentCheckIns"
              :key="index"
              class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50"
            >
              <span class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-medium">
                {{ index + 1 }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="font-body text-sm text-white truncate">{{ guest.name }}</p>
                <p class="font-body text-xs text-gray-500">{{ guest.time }}</p>
              </div>
              <span class="text-green-400 text-xs">✓ Hadir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Hidden container for file-based QR scanning -->
  <div id="qr-reader-file-temp" class="hidden"></div>
</template>

<script setup lang="ts">
import { Html5Qrcode } from 'html5-qrcode'

// Force dark background on body for this page
useHead({
  bodyAttrs: {
    class: 'bg-gray-950',
  },
})

interface ScanResult {
  valid: boolean
  name: string
  phone: string
  row?: number
  alreadyCheckedIn?: boolean
}

interface CheckInRecord {
  name: string
  time: string
}

const scannerActive = ref(false)
const scanResult = ref<ScanResult | null>(null)
const checkingIn = ref(false)
const checkInSuccess = ref(false)
const manualName = ref('')
const manualPhone = ref('')
const cameraError = ref('')
const recentCheckIns = ref<CheckInRecord[]>([])

let html5QrCode: Html5Qrcode | null = null

// Load recent check-ins from localStorage
onMounted(() => {
  const stored = localStorage.getItem('recent_checkins')
  if (stored) {
    try {
      recentCheckIns.value = JSON.parse(stored)
    } catch {
      recentCheckIns.value = []
    }
  }
})

const toggleScanner = async () => {
  if (scannerActive.value) {
    await stopScanner()
  } else {
    await startScanner()
  }
}

const startScanner = async () => {
  try {
    cameraError.value = ''
    html5QrCode = new Html5Qrcode('qr-reader')
    scannerActive.value = true
    scanResult.value = null
    checkInSuccess.value = false

    await html5QrCode.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      onScanSuccess,
      () => {} // ignore scan failures
    )
  } catch (err: any) {
    console.error('Scanner start error:', err)
    scannerActive.value = false
    const msg = err?.message || String(err)
    if (msg.includes('NotAllowedError') || msg.includes('Permission')) {
      cameraError.value = 'Izin kamera ditolak. Pastikan Anda mengizinkan akses kamera di browser.'
    } else if (msg.includes('NotFoundError') || msg.includes('device')) {
      cameraError.value = 'Tidak ditemukan kamera di perangkat ini.'
    } else if (msg.includes('NotReadableError') || msg.includes('insecure') || msg.includes('secure')) {
      cameraError.value = 'Kamera membutuhkan koneksi HTTPS. Gunakan opsi upload foto QR di bawah.'
    } else {
      cameraError.value = 'Gagal mengakses kamera: ' + msg
    }
  }
}

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    const tempQr = new Html5Qrcode('qr-reader-file-temp')
    const result = await tempQr.scanFile(file, true)
    await tempQr.clear()
    onScanSuccess(result)
  } catch (err) {
    console.error('File scan error:', err)
    scanResult.value = {
      valid: false,
      name: 'QR code tidak dapat dibaca dari foto',
      phone: '',
    }
  }
  // Reset input so same file can be re-selected
  input.value = ''
}

const stopScanner = async () => {
  if (html5QrCode) {
    try {
      await html5QrCode.stop()
    } catch {
      // ignore
    }
    html5QrCode = null
  }
  scannerActive.value = false
}

const onScanSuccess = async (decodedText: string) => {
  // Stop scanner after successful scan
  await stopScanner()

  try {
    // Decode base64
    const decoded = atob(decodedText)
    const parts = decoded.split('|')

    if (parts.length !== 2) {
      scanResult.value = {
        valid: false,
        name: 'Format QR tidak valid',
        phone: '',
      }
      return
    }

    const [name, phone] = parts
    await validateGuest(name, phone)
  } catch {
    scanResult.value = {
      valid: false,
      name: 'QR Code tidak dapat dibaca',
      phone: '',
    }
  }
}

const validateGuest = async (name: string, phone: string) => {
  try {
    const response = await $fetch('/api/validate-guest', {
      method: 'POST',
      body: { name, phone },
    })

    scanResult.value = {
      valid: response.valid,
      name: name,
      phone: phone,
      row: response.row,
      alreadyCheckedIn: response.alreadyCheckedIn,
    }
  } catch {
    scanResult.value = {
      valid: false,
      name: name,
      phone: phone,
    }
  }
}

const checkInGuest = async () => {
  if (!scanResult.value?.row) return

  checkingIn.value = true
  checkInSuccess.value = false

  try {
    await $fetch('/api/checkin-guest', {
      method: 'POST',
      body: { row: scanResult.value.row },
    })

    checkInSuccess.value = true
    scanResult.value.alreadyCheckedIn = true

    // Add to recent check-ins
    const record: CheckInRecord = {
      name: scanResult.value.name,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }
    recentCheckIns.value.unshift(record)
    localStorage.setItem('recent_checkins', JSON.stringify(recentCheckIns.value.slice(0, 50)))
  } catch (err) {
    console.error('Check-in error:', err)
  } finally {
    checkingIn.value = false
  }
}

const manualCheck = () => {
  validateGuest(manualName.value, manualPhone.value)
}

onUnmounted(() => {
  stopScanner()
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
