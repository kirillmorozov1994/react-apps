import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { show } from '../../actions/action-alert/action-alert'
import { addedItemList } from '../../actions/action-todo-list/action-todo-list'
import TodoListContext from '../context/'

const ItemAddForm = ({ show, addedItemList, form, alert }) => {
	const [valueTitle, setValueTitle] = useState('')
	const [valueDesc, setValueDesc] = useState('')
	const todoListItem = useContext(TodoListContext)

	const handle = (e) => {
		e.preventDefault()
		if (valueTitle.trim().length < 3 || valueDesc.trim().length < 5) {
			show({
				type: alert.warning.type,
				title: alert.warning.title,
				text: alert.warning.text,
			})
		} else {
			setValueTitle('')
			setValueDesc('')
			const newItem = {
				title: valueTitle.trim(),
				desc: valueDesc.trim(),
				important: false,
				done: false,
			}
			todoListItem
				.addTodoLisItem(newItem)
				.then(({ data: { name } }) => {
					addedItemList({
						id: name,
						...newItem,
					})
					show({
						type: alert.success.type,
						title: alert.success.title,
						text: alert.success.text.addItem,
					})
				})
				.catch((e) =>
					show({
						type: alert.warning.type,
						title: alert.warning.title,
						text: e.message,
					})
				)
		}
	}

	return (
		<form onSubmit={handle}>
			<div className="form-group">
				<label htmlFor="input-item">{form.title.label}</label>
				<input
					id="input-item"
					type="text"
					className="form-control"
					placeholder={form.title.placeholder}
					value={valueTitle}
					onChange={(e) => setValueTitle(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="exampleFormControlTextarea1">
					{form.description.label}
				</label>
				<textarea
					className="form-control"
					id="exampleFormControlTextarea1"
					rows={4}
					placeholder={form.description.placeholder}
					value={valueDesc}
					onChange={(e) => setValueDesc(e.target.value)}
				/>
			</div>
			<button type="submit" className="btn btn-primary mb-2">
				{form.button}
			</button>
		</form>
	)
}

ItemAddForm.defaultProps = {
	show: () => ({
		type: alert.warning.type,
		title: alert.warning.title,
		text: alert.warning.text,
	}),
	addedItemList: () => console.warn('Unable to add list item'),
	form: {
		title: {
			label: 'Enter case title:',
			placeholder: 'Please enter title case',
		},
		description: {
			label: 'Enter description case:',
			placeholder: 'Please enter new case',
		},
		button: 'Add item',
	},
	alert: {
		warning: {
			type: 'warning',
			title: 'Warning',
			text: 'Text length must be at least 5 characters',
		},
		success: {
			type: 'success',
			title: 'Success',
			text: {
				addItem: 'Node created successfully',
				removeItem: 'Item todo success deleted',
			},
		},
	},
}

ItemAddForm.propTypes = {
	show: PropTypes.func.isRequired,
	addedItemList: PropTypes.func.isRequired,
	form: PropTypes.shape({
		title: PropTypes.objectOf(PropTypes.string),
		description: PropTypes.objectOf(PropTypes.string),
		button: PropTypes.string,
	}).isRequired,
	alert: PropTypes.shape({
		warning: PropTypes.objectOf(PropTypes.string),
		success: PropTypes.shape({
			type: PropTypes.string,
			title: PropTypes.string,
			text: PropTypes.objectOf(PropTypes.string),
		}),
	}).isRequired,
}

const mapStateToProps = ({
	settingLang: {
		content: { form, alert },
	},
}) => {
	return {
		form,
		alert,
	}
}

const mapDispatchToProps = {
	addedItemList,
	show,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemAddForm)
