import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ErrorBoundry from './components/error-boundry/error-boundy'
import { ProviderContext } from './components/context/context'
import GithubService from './service/github-service'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app/app'
import './assets/scss/index.scss'

const service = new GithubService()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundry>
				<ProviderContext value={service}>
					<Router>
						<App />
					</Router>
				</ProviderContext>
			</ErrorBoundry>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
