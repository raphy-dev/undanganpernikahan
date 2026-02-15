export const useWeddingConfig = () => {
  return {
    groom: {
      name: 'Ahmad Fauzan',
      fullName: 'Ahmad Fauzan, S.Kom',
      parent: 'Putra dari Bapak Hasan & Ibu Aminah',
    },
    bride: {
      name: 'Siti Nurhaliza',
      fullName: 'Siti Nurhaliza, S.Pd',
      parent: 'Putri dari Bapak Ridwan & Ibu Kartini',
    },
    event: {
      // Set the wedding date — adjust as needed
      date: new Date('2026-02-15T09:00:00+07:00'),
      akadTime: '09:00 - 10:00 WIB',
      resepsiTime: '11:00 - 14:00 WIB',
      venue: 'Gedung Serbaguna Mawar Indah',
      address: 'Jl. Melati No. 123, Kecamatan Bunga, Kota Indah, Jawa Barat 45678',
      // Replace with your actual Google Maps embed URL
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890',
    },
    quote: '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang." — QS. Ar-Rum: 21',
    story: [
      {
        title: 'Pertama Bertemu',
        date: '2020',
        text: 'Kami pertama kali bertemu di sebuah acara kampus. Sebuah pertemuan sederhana yang ternyata menjadi awal dari kisah indah kami.',
      },
      {
        title: 'Menjalin Hubungan',
        date: '2021',
        text: 'Setelah setahun saling mengenal, kami memutuskan untuk menjalin hubungan yang lebih serius dan saling mendukung satu sama lain.',
      },
      {
        title: 'Lamaran',
        date: '2025',
        text: 'Dengan restu kedua orang tua, kami melangkah ke jenjang yang lebih serius. Sebuah lamaran yang penuh kebahagiaan dan air mata haru.',
      },
      {
        title: 'Pernikahan',
        date: '2026',
        text: 'Kami mengundang Anda untuk menyaksikan dan mendoakan ikatan suci kami. Semoga Allah SWT memberkahi perjalanan kami.',
      },
    ],
  }
}
