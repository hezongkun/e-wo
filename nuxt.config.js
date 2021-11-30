import glob from 'glob'
import { removeSync } from 'fs-extra'
import SentryWebpackPlugin from '@sentry/webpack-plugin'
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
    script: [
      {
        src: 'https://hm.baidu.com/hm.js?a379c468dd157e7ceb336dc37b15067c',
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/sentry'],

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
    SENTRY_DSN: process.env.SENTRY_DSN,
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
  // build: {
  //   extractCSS: true,
  //   optimization: {
  //     splitChunks: {
  //       cacheGroups: {
  //         styles: {
  //           name: 'styles',
  //           test: /\.(css|scss|less|vue)$/,
  //           chunks: 'all',
  //           enforce: true,
  //         },
  //       },
  //     },
  //   },
  // },

  build: {
    extend(config, ctx) {
      /** 引入打包时自动上传sourcemap的插件 */
      const { isDev, isClient } = ctx
      if (!isDev && isClient && process.env.SENTRY_AUTH_TOKEN) {
        if (isClient) config.devtool = 'hidden-source-map'
        const path = config.output.publicPath
        config.plugins.push(
          new SentryWebpackPlugin({
            include: ['.nuxt/dist/client'],
            ignore: [
              'node_modules',
              '.nuxt/dist/client/fonts',
              '.nuxt/dist/server',
            ],
            urlPrefix: path.startsWith('/') ? `~${path}` : path,
          }),
          // 构建完后删除 source map 文件的简易插件
          {
            apply: (compiler) => {
              compiler.hooks.done.tap('CleanJsMapPlugin', () => {
                glob
                  .sync('.nuxt/dist/**/*.js.map')
                  .forEach((f) => removeSync(f))
              })
            },
          }
        )
      }
    },
  },
}
