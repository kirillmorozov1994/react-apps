import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import MainPage from '../pages/main-page'
import ReposPage from '../pages/repos-page'
import CartPage from '../pages/cart-page'
import NotFoundPage from '../pages/not-found-page'
import { Route, Switch } from 'react-router-dom'

const App = () => {
	return (
		<>
			<Header />
			<div className="container">
				<div className="page">
					<div className="page-wrapper">
						<Switch>
							<Route path="/" exact>
								<MainPage />
							</Route>
							<Route path="/repos/:name?/:page?" exact>
								<ReposPage />
							</Route>
							<Route path="/cart/:login?/:name?" exact>
								<CartPage />
							</Route>
							<Route>
								<NotFoundPage />
							</Route>
						</Switch>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default App
