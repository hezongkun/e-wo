import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'

// process.env.NODE_ENV === 'production' &&
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  logErrors: false,
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],
})

Vue.prototype.$Sentry = Sentry
