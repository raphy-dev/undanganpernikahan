import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    content: [],
    theme: {
        extend: {
            colors: {
                cream: '#FDF8F0',
                'cream-dark': '#F5EDE0',
                gold: {
                    50: '#FFF9E6',
                    100: '#FFF0BF',
                    200: '#FFE699',
                    300: '#FFD966',
                    400: '#FFCC33',
                    500: '#C8A951',
                    600: '#B8943D',
                    700: '#9A7B2F',
                    800: '#7C6324',
                    900: '#5E4A1A',
                },
                blush: {
                    50: '#FFF0F3',
                    100: '#FFE0E6',
                    200: '#FFC2CD',
                    300: '#FFA3B4',
                    400: '#FF859B',
                    500: '#E8728A',
                    600: '#D4586F',
                    700: '#B84058',
                    800: '#9C2D44',
                    900: '#801A30',
                },
                sage: {
                    50: '#F0F5F0',
                    100: '#E0EBE0',
                    200: '#C2D6C2',
                    300: '#A3C2A3',
                    400: '#85AD85',
                    500: '#6B9B6B',
                    600: '#578257',
                    700: '#436943',
                    800: '#2F502F',
                    900: '#1B371B',
                },
            },
            fontFamily: {
                display: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
                script: ['"Great Vibes"', 'cursive'],
                body: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
                'scale-in': 'scaleIn 0.6s ease-out forwards',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config
