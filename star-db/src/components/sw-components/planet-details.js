import React from 'react'
import ItemDetails from '../item-details'
import Record from '../record'
import { withSwapiService } from '../hoc-helper'

const PlanetDetails = (props) => {
	return (
		<ItemDetails {...props}>
			<Record field="population" label="Population" />

			<Record field="rotationPeriod" label="Rotation Period" />

			<Record field="diameter" label="Diameter" />
		</ItemDetails>
	)
}

const mapMethodsToProps = ({ getPlanet, getPlanetImage }) => {
	return {
		getData: getPlanet,
		getImageUrl: getPlanetImage,
	}
}

export default withSwapiService(mapMethodsToProps)(PlanetDetails)
