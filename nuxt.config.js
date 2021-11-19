// import { resolve } from 'path'
const envConfig = require('dotenv').config({
  path: `.env${process.env.ENV ? `.${process.env.ENV}` : ''}`,
})
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'e-wo',
    htmlAttrs: {
      lang: 'zh-CN',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '前端笔记,VUE',
      },
      {
        hid: 'description',
        name: 'description',
        content: '前端笔记,VUE',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],
  env: {
    ...process.env,
    ...envConfig.parsed,
  },
  server: {
    port: process.env.BASE_PORT, // default: 3000
    host: process.env.BASE_HOST || '0.0.0.0',
  },
  axios: {
    proxy: true,
    prefix: '/api/',
    credentials: true,
    withCredentials: true,
    // See https://github.com/nuxt-community/axios-module#options
  },
  // router: {
  //   base: '/api/',
  // },

  proxy: {
    '/api/': {
      target: process.env.BASE_URL,
      pathRewrite: {
        '^/api/': '/',
        changeOrigin: true,
      },
    },
    // '/sso/': {
    //   target: process.env.BASE_URL,
    //   pathRewrite: {
    //     '^/sso/': '/',
    //     changeOrigin: true,
    //   },
    // },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|scss|less|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  },
}
