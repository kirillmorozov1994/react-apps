import React from 'react'
import { connect } from 'react-redux'
import { RoutePage } from '../hoc'

const AboutPage = ({ about }) => (
	<div className="jumbotron bg-dark">
		<h1 className="display-4 text-white">{about.title}</h1>
		<p className="lead text-white">{about.subtitle}</p>
		<hr className="my-4" />
		<p className="text-white">{about.description}</p>
		<a
			className="btn btn-outline-primary btn-lg"
			href="https://github.com/kirillmorozov1994"
			role="button"
		>
			{about.button}
		</a>
	</div>
)

const mapStateToProps = ({
	settingLang: {
		content: { about },
	},
}) => {
	return {
		about,
	}
}

export default RoutePage(connect(mapStateToProps)(AboutPage))
