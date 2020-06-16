import React, { useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/action-todo-list/action-todo-list'
import { show } from '../../actions/action-alert/action-alert'
import PropTypes from 'prop-types'
import TodoListContext from '../context'
import Spinner from '../spinner'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ErrorIndicator from '../error-indicator'

const ItemList = ({
	todoList,
	removeItemList,
	onDoneItem,
	onImportantItem,
	fetchListRequest,
	fetchListSuccess,
	fetchListFailuer,
	loading,
	search,
	filter,
	error,
	show,
	itemNotFound,
	alert,
}) => {
	const todoListItem = useContext(TodoListContext)

	useEffect(() => {
		fetchListRequest()
		// eslint-disable-next-line
		todoListItem
			.getTodoList()
			.then((todo) => fetchListSuccess(todo))
			.catch((error) => fetchListFailuer(error))
		// eslint-disable-next-line
	}, [])

	const groupProps = {
		appear: true,
		enter: true,
		exit: true,
	}

	const ImportantOrDone = (id, prop) => {
		const impOrDone = prop === 'done' ? onDoneItem : onImportantItem
		const item = todoList.find((el) => el.id === id)
		const newItem = {
			...item,
			[prop]: !item[prop],
		}
		delete newItem.id
		todoListItem.editTodoLisItem(id, newItem).then(() => impOrDone(id))
	}

	const removeTodoItem = (id) => {
		todoListItem
			.removeTodoListItem(id)
			.then(() => {
				removeItemList(id)
				show({
					type: alert.success.type,
					title: alert.success.title,
					text: alert.success.text.removeItem,
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

	const filterItem = (arr, fltr) => {
		switch (fltr) {
			case 'done':
				return arr.filter(({ done }) => done)
			case 'important':
				return arr.filter(({ important }) => important)
			case 'active':
				return arr.filter(({ done }) => !done)
			case 'all':
				return arr
			default:
				return arr
		}
	}

	const searchItem = (arr, str) => {
		return arr.filter(({ title, desc }) => {
			return (
				title.toLowerCase().indexOf(str) === 0 ||
				~desc.toLowerCase().indexOf(str)
			)
		})
	}

	if (loading) {
		return <Spinner />
	}

	if (error) {
		return <ErrorIndicator />
	}

	const todoListItems = filterItem(
		searchItem(todoList, search.toLowerCase()),
		filter
	)

	return !todoListItems.length ? (
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
			{itemNotFound}
		</div>
	) : (
		<TransitionGroup className="list-group" {...groupProps}>
			{todoListItems.map(({ id, title, desc, important, done }) => {
				const importantOrDone =
					important && done
						? 'important done'
						: important
						? 'important'
						: done
						? 'done'
						: ''
				const importantActive = important
					? 'fas fa-exclamation-circle important-active'
					: 'fas fa-exclamation-circle'
				const doneActive = done
					? 'fas fa-check-circle done-active'
					: 'fas fa-check-circle'
				return (
					<CSSTransition
						key={id}
						timeout={500}
						classNames="todo-item"
					>
						<li className="list-group-item">
							<div className="notes">
								<div>
									<h3 className={importantOrDone}>{title}</h3>
									<div className={importantOrDone}>
										{desc}
									</div>
								</div>
								<div>
									<button
										className="btn-item btn-item-important"
										onClick={() =>
											ImportantOrDone(id, 'important')
										}
									>
										<i className={importantActive}></i>
									</button>
									<button
										className="btn-item btn-item-done"
										onClick={() =>
											ImportantOrDone(id, 'done')
										}
									>
										<i className={doneActive}></i>
									</button>
									<button
										className="btn-item btn-item-close"
										onClick={() => removeTodoItem(id)}
									></button>
								</div>
							</div>
						</li>
					</CSSTransition>
				)
			})}
		</TransitionGroup>
	)
}

ItemList.defaultProps = {
	todoList: [],
	removeItemList: () => console.warn('Unable to remove list item'),
	onDoneItem: () => console.warn('Сannot mark list item as important'),
	onImportantItem: () => console.warn('Сannot mark list item as done'),
	fetchListRequest: () =>
		console.warn('Action "fetchListRequest" not passed as props'),
	fetchListSuccess: () =>
		console.warn('Action "fetchListSuccess" not passed as props'),
	fetchListFailuer: () =>
		console.warn('Action "fetchListFailuer" not passed as props'),
	loading: true,
	search: '',
	filter: 'all',
	show: () => ({
		type: alert.warning.type,
		title: alert.warning.title,
		text: alert.warning.text,
	}),
	addedItemList: 'Item list not found',
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

ItemList.propTypes = {
	todoList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			desc: PropTypes.string,
			important: PropTypes.bool,
			done: PropTypes.bool,
		})
	),
	removeItemList: PropTypes.func.isRequired,
	onDoneItem: PropTypes.func.isRequired,
	onImportantItem: PropTypes.func.isRequired,
	fetchListRequest: PropTypes.func.isRequired,
	fetchListSuccess: PropTypes.func.isRequired,
	fetchListFailuer: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	search: PropTypes.string.isRequired,
	filter: PropTypes.string.isRequired,
	error: PropTypes.any,
	show: PropTypes.func.isRequired,
	itemNotFound: PropTypes.string.isRequired,
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
	todoList,
	loading,
	search,
	filter,
	error,
	settingLang: {
		content: {
			listItem: { itemNotFound },
			alert,
		},
	},
}) => {
	return {
		todoList,
		loading,
		search,
		filter,
		error,
		itemNotFound,
		alert,
	}
}

const mapDispatchToProps = {
	...actions,
	show,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
