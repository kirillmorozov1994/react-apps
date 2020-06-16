import React from 'react'
import {
	withData,
	withSwapiService,
	withChildFunction,
	compose,
} from '../hoc-helper'
import ItemList from '../item-list'

const renderName = ({ name }) => <span> {name} </span>
const renderNameStarship = ({ name, model }) => (
	<span>
		{' '}
		{name} ({model}){' '}
	</span>
)

const mapPersonMethodsToProps = ({ getAllPeople }) => {
	return {
		getData: getAllPeople,
	}
}

const mapPlanetMethodsToProps = ({ getAllPlanets }) => {
	return {
		getData: getAllPlanets,
	}
}

const mapStarshipMethodsToProps = ({ getAllStarships }) => {
	return {
		getData: getAllStarships,
	}
}

const PersonList = compose(
	withSwapiService(mapPersonMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList)

const PlanetList = compose(
	withSwapiService(mapPlanetMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList)

const StarshipList = compose(
	withSwapiService(mapStarshipMethodsToProps),
	withData,
	withChildFunction(renderNameStarship)
)(ItemList)

export { PersonList, PlanetList, StarshipList }
