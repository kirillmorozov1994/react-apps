export default class SwapiService {
	_apiBase = 'https://swapi.dev/api'
	_imageBase = 'https://starwars-visualguide.com/assets/img'

	getResource = async (url) => {
		const response = await fetch(`${this._apiBase}${url}`)

		if (!response.ok) {
			throw new Error(`Could not fetch ${url}, received ${response.status}`)
		}

		return await response.json()
	}

	getAllPeople = async () => {
		const res = await this.getResource('/people/')
		return res.results.map(this._transformPerson)
	}

	getPerson = async (id) => {
		const person = await this.getResource(`/people/${id}/`)
		return this._transformPerson(person)
	}

	getPersonImage = ({ id }) => {
		return `${this._imageBase}/characters/${id}.jpg`
	}

	getAllPlanets = async () => {
		const res = await this.getResource('/planets/')
		return res.results.map(this._transformPlanet)
	}

	getPlanet = async (id) => {
		const planet = await this.getResource(`/planets/${id}/`)
		return this._transformPlanet(planet)
	}

	getPlanetImage = ({ id }) => {
		return `${this._imageBase}/planets/${id}.jpg`
	}

	getAllStarships = async () => {
		const res = await this.getResource('/starships/')
		return res.results.map(this._transformStarShip)
	}

	getStarship = async (id) => {
		const starShip = await this.getResource(`/starships/${id}/`)
		return this._transformStarShip(starShip)
	}

	getStarshipImage = ({ id }) => {
		return `${this._imageBase}/starships/${id}.jpg`
	}

	extractId = (url) => {
		const idRegExp = /\/([0-9]*)\/$/
		return url.match(idRegExp)[1]
	}

	_transformPlanet = ({ name, population, rotation_period, diameter, url }) => {
		return {
			id: this.extractId(url),
			name,
			population,
			rotationPeriod: rotation_period,
			diameter,
		}
	}

	_transformPerson = ({ name, gender, birth_year, eye_color, url }) => {
		return {
			id: this.extractId(url),
			name,
			gender,
			birthYear: birth_year,
			eyeColor: eye_color,
		}
	}

	_transformStarShip = ({
		name,
		model,
		manufacturer,
		cost_in_credits,
		length,
		crew,
		passengers,
		cargoCapacity,
		url,
	}) => {
		return {
			id: this.extractId(url),
			name,
			model,
			manufacturer,
			costInCredits: cost_in_credits,
			length,
			crew,
			passengers,
			cargoCapacity,
		}
	}
}
