import React, { Component } from 'react'
import { StarshipList, StarshipDetails } from '../sw-components'
import Row from '../row'

export default class StarshipPage extends Component {
	state = {
		selectedStarship: 9,
	}

	onItemSelected = (id) => {
		this.setState({
			selectedStarship: id,
		})
	}

	render() {
		const { selectedStarship } = this.state

		return (
			<Row
				left={
					<StarshipList
						itemSelected={selectedStarship}
						onItemSelected={this.onItemSelected}
					/>
				}
				right={<StarshipDetails itemId={selectedStarship} />}
			/>
		)
	}
}
