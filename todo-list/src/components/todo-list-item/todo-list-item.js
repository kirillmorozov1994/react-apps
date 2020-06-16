import React from 'react'
import './todo-list-item.css'

export default ({
	label,
	important,
	done,
	onDoneItem,
	onImportantItem,
	onDeleteItem,
}) => {
	const classDoneImportant = `todo-list-item ${done ? 'done' : ''} ${
		important ? 'important' : ''
	}`

	return (
		<li className="list-group-item">
			<span className={classDoneImportant}>
				<span className="todo-list-item-label" onClick={onDoneItem}>
					{label}
				</span>

				<button
					type="button"
					className="btn btn-outline-success btn-sm float-right"
					onClick={onImportantItem}
				>
					<i className="fa fa-exclamation"></i>
				</button>

				<button
					type="button"
					className="btn btn-outline-danger btn-sm float-right"
					onClick={onDeleteItem}
				>
					<i className="fa fa-trash-o"></i>
				</button>
			</span>
		</li>
	)
}
