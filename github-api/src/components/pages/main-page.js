import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearState } from '../../actions/actions'

const MainPage = ({ clearState }) => {
	//eslint-disable-next-line
	useEffect(() => () => clearState(), [])

	return (
		<div className="main">
			<h1 className="main-title">Добро пожаловать на главную страницу!</h1>
			<h2 className="main-subtitle">В качестве API используется gitHub API.</h2>
			<div className="main-content">
				Чтобы перейти к поиску репозиториев пользователей gitHub перейдите по
				ссылке ниже.
				<div className="arrow-down">
					<span className="arrow-down-element"></span>
					<span className="arrow-down-element"></span>
					<span className="arrow-down-element"></span>
					<span className="arrow-down-element"></span>
					<span className="arrow-down-element"></span>
					<span className="arrow-down-element"></span>
				</div>
				<Link to="/repos/-/1" className="main-content-link">
					Погнали
				</Link>
			</div>
		</div>
	)
}

MainPage.propTypes = {
	clearState: PropTypes.func.isRequired,
}

export default connect(() => ({}), { clearState })(MainPage)
