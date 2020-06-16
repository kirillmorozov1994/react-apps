import React, { Component } from 'react'
import './item-status-filter.css'

export default class ItemStatusFilter extends Component {
	buttons = [
		{ name: 'all', label: 'All' },
		{ name: 'active', label: 'Active' },
		{ name: 'done', label: 'Done' },
	]

	render() {
		const { filter, onChangeFilter } = this.props

		const buttons = this.buttons.map(({ name, label }) => {
			const clazz =
				name === filter ? 'btn btn-info' : 'btn btn-outline-secondary'

			return (
				<button
					type="button"
					className={clazz}
					onClick={() => {
						onChangeFilter(name)
					}}
					key={name}
				>
					{label}
				</button>
			)
		})

		return <div className="btn-group">{buttons}</div>
	}
}
