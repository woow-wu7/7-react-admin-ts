import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './styles/index.scss'
import { getUserConfirmation } from '@/utils'
import 'intersection-observer'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import './mock/music'


Sentry.init({
  dsn: 'https://fee8497c943342baabf5e4fc0ecf4e25@o517062.ingest.sentry.io/5624307',
  integrations: [new Integrations.BrowserTracing()],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

// TODO: 注意优先级 react-redux => router，用react-redux包裹router
ReactDOM.render(
  <Provider store={store}>
    <Router getUserConfirmation={getUserConfirmation}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
