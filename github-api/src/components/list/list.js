import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ListItem from '../list-item/list-item'
import Spinner from '../spinner/spinner'

const List = ({ listRepos, loading }) => {
	let content = null

	if (loading) {
		content = <Spinner />
	} else {
		content =
			listRepos === 'Not Found' ? (
				<li key="not-found" className="not-found">
					По вашему запросу ничего не найдено
				</li>
			) : (
				listRepos &&
				listRepos.map((items) => <ListItem key={items.fullName} {...items} />)
			)
	}

	return (
		<div className="wrapper">
			<ul className="list">{content}</ul>
		</div>
	)
}

List.defaultProps = {
	listRepos: null,
	loading: true,
}

List.propTypers = {
	listRepos: PropTypes.any,
	loading: PropTypes.bool,
}

const mapStateToProps = ({ listRepos, loading, error }) => ({
	listRepos,
	loading,
	error,
})

export default connect(mapStateToProps)(List)
