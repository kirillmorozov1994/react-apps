import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SearchPanel from '../search-panel/search-panel'
import List from '../list/list'
import Pagination from '../pagination/pagination'
import { connect } from 'react-redux'
import { clearState } from '../../actions/actions'

const ReposPage = ({ clearState }) => {
	//eslint-disable-next-line
	useEffect(() => () => clearState(), [])

	return (
		<div className="repos">
			<SearchPanel />
			<List />
			<Pagination />
		</div>
	)
}

ReposPage.propTypes = {
	clearState: PropTypes.func.isRequired,
}

export default connect(() => ({}), { clearState })(ReposPage)
