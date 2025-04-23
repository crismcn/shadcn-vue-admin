import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'YYF SHADCN ADMIN', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', 'shadcn-nuxt', '@nuxtjs/color-mode', '@vueuse/nuxt', '@pinia/nuxt', '@nuxt/icon', 'nuxt-i18n-micro'],
  css: ['@unocss/reset/tailwind.css'],
  colorMode: {
    classSuffix: '', // 不写上该配置切换暗黑模式不生效 @nuxtjs/color-mode
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  runtimeConfig: {
    apiSecret: '', // 可以被 NUXT_API_SECRET 环境变量覆盖
    public: {
      apiBase: '', // 可以被 NUXT_PUBLIC_API_BASE 环境变量覆盖
      zodI18n: {
        // dateFormat: Intl.DateTimeFormatOptions
        dateFormat: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
      },
    },
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', dir: 'ltr' },
      { code: 'zh-CN', iso: 'zh-CN', dir: 'ltr' },
    ],
    localeCookie: 'lang',
    // defaultLocale: 'zh-CN',
    translationDir: 'locales',
    autoDetectLanguage: true,
    autoDetectPath: '/',
    meta: true,
  },
})
