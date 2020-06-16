import React, { Component } from 'react'
import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorBoundry from '../error-boundry'
import SwapiService from '../../services/swapi-service'
import DummySwapiService from '../../services/dummy-swapi-service'
import { SwapiServiceProvider } from '../swapi-service-context'
import {
	PeoplePage,
	PlanetPage,
	StarshipPage,
	LoginPage,
	SecretPage,
} from '../pages'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
import { StarshipDetails, StarshipList } from '../sw-components/'
import './app.css'

export default class App extends Component {
	state = {
		service: new SwapiService(),
		isLoggedIn: false,
	}

	showRandomPlanet = () => {
		this.setState(({ showRandomPlanet }) => {
			return {
				showRandomPlanet: !showRandomPlanet,
			}
		})
	}

	onLogin = () => {
		this.setState({
			isLoggedIn: true,
		})
	}

	onChangeService = () => {
		this.setState(({ service }) => {
			const setService =
				service instanceof SwapiService ? DummySwapiService : SwapiService
			return {
				service: new setService(),
			}
		})
	}

	render() {
		const { isLoggedIn } = this.state

		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.state.service}>
					<Router>
						<div className="stardb-app container-md">
							<Header onChangeService={this.onChangeService} />

							<RandomPlanet />

							<Switch>
								<Route
									path="/"
									exact
									render={() => {
										return (
											<div>
												<h2
													style={{
														textAlign: 'center',
													}}
												>
													Welcome to StarWars
												</h2>
												<PlanetPage />
												<StarshipPage />
											</div>
										)
									}}
								/>

								<Route
									path="/people/:id?"
									component={PeoplePage}
									render={(props) => {
										return (
											<div>
												<h2>People</h2>
												<PeoplePage {...props} />
											</div>
										)
									}}
								/>

								<Route
									path="/planets/"
									render={() => {
										return (
											<div>
												<h2>Planets</h2>
												<PlanetPage />
											</div>
										)
									}}
								/>

								<Route
									path="/starships/"
									exact
									render={({ history }) => {
										return (
											<div>
												<h2>Starships</h2>
												<StarshipList
													onItemSelected={(itemId) => {
														history.push(itemId)
													}}
												/>
											</div>
										)
									}}
								/>

								<Route
									path="/starships/:id"
									render={({ match }) => {
										const { id } = match.params
										return <StarshipDetails itemId={id} />
									}}
								/>

								<Route
									path="/login"
									render={() => (
										<LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
									)}
								/>

								<Route
									path="/secret"
									render={() => <SecretPage isLoggedIn={isLoggedIn} />}
								/>

								<Redirect to="/" />
							</Switch>
						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundry>
		)
	}
}
