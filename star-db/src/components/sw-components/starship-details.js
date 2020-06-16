import React from 'react'
import ItemDetails from '../item-details'
import Record from '../record'
import { withSwapiService } from '../hoc-helper'

const StarshipDetails = (props) => {
	return (
		<ItemDetails {...props}>
			<Record field="model" label="Model" />
			<Record field="length" label="Length" />
			<Record field="costInCredits" label="Cost" />
		</ItemDetails>
	)
}

const mapMethodsToProps = ({ getStarship, getStarshipImage }) => {
	return {
		getData: getStarship,
		getImageUrl: getStarshipImage,
	}
}

export default withSwapiService(mapMethodsToProps)(StarshipDetails)
