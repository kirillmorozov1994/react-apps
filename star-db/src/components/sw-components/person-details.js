import React from 'react'
import ItemDetails from '../item-details'
import Record from '../record'
import { withSwapiService } from '../hoc-helper'

const PersonDetails = (props) => {
	return (
		<ItemDetails {...props}>
			<Record field="gender" label="Gender" />

			<Record field="eyeColor" label="eyeColor" />
		</ItemDetails>
	)
}

const mapMethodsToProps = ({ getPerson, getPersonImage }) => {
	return {
		getData: getPerson,
		getImageUrl: getPersonImage,
	}
}

export default withSwapiService(mapMethodsToProps)(PersonDetails)
