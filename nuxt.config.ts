// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {},
  css: ["~/node_modules/bootstrap/dist/css/bootstrap.min.css"],
  // plugins: [
  //   {
  //     src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
  //     mode: "client",
  //   },
  // ],
  
  runtimeConfig: {
    openAi: {
      secretKey:"",
    },
  },
});
