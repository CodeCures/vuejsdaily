// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    openAIKey: process.env.OPENAI_API_KEY,
    public: {
      openAIKey: process.env.OPENAI_API_KEY
    }
  },
  modules: ['@nuxt/content', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    classSuffix: ''
  },
  content: {
    markdown: {
      anchorLinks: true,
    },
    highlight: {

      // Theme used in all color schemes.
      theme: {
        // Default theme (same as single string)
        light: 'github-dark',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      }
    }
  }
})
