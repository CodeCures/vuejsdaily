export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    return {
        provide: {
            ai: new AIClient(config.public.openAIKey)
        }
    }
})