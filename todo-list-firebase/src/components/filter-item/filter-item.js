import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	searchInput,
	filterItem,
} from '../../actions/action-todo-list/action-todo-list'

const FilterItem = ({
	searchInput,
	filterItem,
	search,
	filter,
	filterList,
}) => {
	const buttonItems = [
		{
			label: 'all',
			type: 'btn btn-outline-primary ',
			text: filterList.buttons[0],
		},
		{
			label: 'done',
			type: 'btn btn-outline-success ',
			text: filterList.buttons[1],
		},
		{
			label: 'active',
			type: 'btn btn-outline-dark ',
			text: filterList.buttons[2],
		},
		{
			label: 'important',
			type: 'btn btn-outline-danger ',
			text: filterList.buttons[3],
		},
	]

	const buttons = buttonItems.map(({ label, type, text }) => {
		return (
			<button
				key={label}
				className={label === filter ? type + 'active' : type}
				type="button"
				onClick={() => filterItem(label)}
			>
				{text}
			</button>
		)
	})

	return (
		<div className="input-group d-flex flex-wrap justify-content-end">
			<input
				type="text"
				className="form-control w-50"
				placeholder={filterList.search.placeholder}
				value={search}
				onChange={(e) => searchInput(e.target.value)}
			/>
			<div className="input-group-append">{buttons}</div>
		</div>
	)
}

FilterItem.defaultProps = {
	searchInput: (value) => console.warn(value),
	filterItem: (label) => console.warn(label),
	search: '',
	filter: 'all',
	filterList: ['All', 'Done', 'Active', 'Important'],
}

FilterItem.propTypes = {
	searchInput: PropTypes.func.isRequired,
	filterItem: PropTypes.func.isRequired,
	search: PropTypes.string,
	filter: PropTypes.string,
	filterList: PropTypes.shape({
		search: PropTypes.objectOf(PropTypes.string),
		buttons: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
}

const mapStateToProps = ({
	search,
	filter,
	settingLang: {
		content: { filterList },
	},
}) => {
	return {
		search,
		filter,
		filterList,
	}
}

const mapDispatchToProps = {
	searchInput,
	filterItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterItem)
