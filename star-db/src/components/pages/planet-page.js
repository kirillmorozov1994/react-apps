import React, { Component } from 'react'
import Row from '../row'
import { PlanetList } from '../sw-components'
import { PlanetDetails } from '../sw-components'

export default class PlanetPage extends Component {
	state = {
		selectedPlanet: 2,
	}

	onItemSelected = (id) => {
		this.setState({
			selectedPlanet: id,
		})
	}

	render() {
		const { selectedPlanet } = this.state

		return (
			<Row
				left={
					<PlanetList
						itemSelected={selectedPlanet}
						onItemSelected={this.onItemSelected}
					/>
				}
				right={<PlanetDetails itemId={selectedPlanet} />}
			/>
		)
	}
}
