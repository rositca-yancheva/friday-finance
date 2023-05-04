import type { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  ssr: false,
  components: true,
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  head: {
    title: "client",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
  },
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/tailwindcss"],
  css: ["@/assets/css/main.css"],
};

export default config;