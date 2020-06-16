import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import TodoListContext from './components/context'
import store from './store/store'
import TodoListService from './service'

import './assets/scss/index.scss'
import App from './components/app'
import ErrorBoundry from './components/error-boundry'

const todoListService = new TodoListService()

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<TodoListContext.Provider value={todoListService}>
				<Router>
					<App />
				</Router>
			</TodoListContext.Provider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root')
)
