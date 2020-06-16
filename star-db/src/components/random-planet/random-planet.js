import React, { Component } from 'react'
import SwapiService from '../../services'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator/'
import ErrorBoundry from '../error-boundry'
import PropTypes from 'prop-types'
import './random-planet.css'

export default class RandomPlanet extends Component {
	static defaultProps = {
		updateInterval: 10000,
	}

	static propTypes = {
		updateInterval: PropTypes.number,
	}

	state = {
		planet: {},
		loading: true,
	}

	componentDidMount() {
		const { updateInterval } = this.props
		this.updateData()
		this.interval = setInterval(this.updateData, updateInterval)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading: false,
			error: false,
		})
	}

	onErrorLoaded = () => {
		this.setState({
			error: true,
			loading: false,
		})
	}

	updateData = () => {
		const id = Math.floor(Math.random() * 15) + 3
		const planet = new SwapiService()
		planet.getPlanet(id).then(this.onPlanetLoaded).catch(this.onErrorLoaded)
	}

	render() {
		const { planet, loading, error } = this.state

		const hasData = !(loading || error)
		const errorIndicator = error ? <ErrorIndicator /> : null
		const spinner = loading ? <Spinner /> : null
		const content = hasData ? <PlanetView planet={planet} /> : null

		return (
			<ErrorBoundry>
				<div className="random-planet jumbotron rounded">
					{errorIndicator}

					{spinner}

					{content}
				</div>
			</ErrorBoundry>
		)
	}
}

const PlanetView = ({ planet }) => {
	const { id, name, population, rotationPeriod, diameter } = planet

	return (
		<React.Fragment>
			<div className="planet-wrapper">
				<img
					className="planet-image"
					src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
					alt="planet-img"
				/>
			</div>
			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population: </span>
						<span>{population}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation Period: </span>
						<span>{rotationPeriod}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter: </span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	)
}
