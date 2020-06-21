import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	requestInitRepos,
	requestEnterRepos,
} from '../../actions/actions-request'
import { setCurrentPage, clearState } from '../../actions/actions'
import { withContextService } from '../hoc/with-context-service'

class SeachPanel extends Component {
	componentDidMount() {
		this.saveChangeReload()
	}

	componentDidUpdate(prevProps) {
		const { history, location } = this.props
		if (
			history.action === 'POP' &&
			location.pathname !== prevProps.location.pathname
		) {
			this.saveChangeReload()
		}
	}

	changeInput = (e) => {
		const { requestEnterRepos } = this.props
		requestEnterRepos(e.target.value.toLowerCase())
	}

	saveChangeReload = () => {
		const { match, requestInitRepos, setCurrentPage } = this.props
		const nameRepos = match.params.name
		const countPage = this.isNumeric(match.params.page)
		if (
			nameRepos !== undefined &&
			nameRepos.trim() !== '-' &&
			nameRepos.trim() !== ''
		) {
			const smallLetters = nameRepos.toLowerCase()
			if (countPage) {
				setCurrentPage(countPage)
				requestInitRepos(smallLetters)
			} else {
				setCurrentPage(1)
				requestInitRepos(smallLetters)
			}
		} else {
			setCurrentPage(1)
			requestInitRepos('')
		}
	}

	isNumeric = (page) => {
		const numberPage = parseInt(page)
		if (Number.isInteger(numberPage)) {
			return numberPage
		} else {
			return 1
		}
	}

	render() {
		const { currentSearch } = this.props

		return (
			<div className="search">
				<label htmlFor="search-input" className="search-label">
					Поиск:
				</label>
				<input
					id="search-input"
					className="search-input"
					type="text"
					placeholder="Введите имя репозитория"
					value={currentSearch}
					onChange={this.changeInput}
				/>
			</div>
		)
	}
}

SeachPanel.defaultProps = {
	currentSearch: '',
}

SeachPanel.defaultProps = {
	currentSearch: PropTypes.string,
	match: PropTypes.object.isRequired,
	requestInitRepos: PropTypes.func.isRequired,
	requestEnterRepos: PropTypes.func.isRequired,
	setCurrentPage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ currentSearch }) => {
	return {
		currentSearch,
	}
}

const mapStateToDispatch = (dispatch, { service, history }) => ({
	requestInitRepos: (term) =>
		dispatch(requestInitRepos(term, service, history)),
	requestEnterRepos: (term) =>
		dispatch(requestEnterRepos(term, service, history)),
	setCurrentPage: (page) => dispatch(setCurrentPage(page)),
	clearState: () => dispatch(clearState()),
})

export default compose(
	withContextService(),
	withRouter,
	connect(mapStateToProps, mapStateToDispatch)
)(SeachPanel)
