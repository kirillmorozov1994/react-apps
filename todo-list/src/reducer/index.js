const initialData = {
	todoData: [
		createItem('Drink Coffee', 1),
		createItem('Learn React', 2),
		createItem('Do you now?', 3),
	],
	term: '',
	filter: 'all',
}

function createItem(label, id) {
	return {
		label,
		important: false,
		done: false,
		id,
	}
}

const updateTodoItems = (todoData, lblORid, type) => {
	if (type === 'add') {
		return [
			...todoData,
			createItem(lblORid, todoData[todoData.length - 1].id + 1),
		]
	}
	if (type === 'remove') {
		const index = todoData.findIndex(({ id }) => id === lblORid)
		return [...todoData.slice(0, index), ...todoData.slice(index + 1)]
	}
}

const onDoneImportant = (todoData, idItem, propName) => {
	const index = todoData.findIndex(({ id }) => id === idItem)
	const item = todoData[index]
	const newItem = {
		...item,
		[propName]: !item[propName],
	}
	return [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)]
}

const reducer = (state = initialData, action) => {
	switch (action.type) {
		case 'INITIAL_DATA':
			return state
		case 'CHANGE_FILTER':
			return {
				...state,
				filter: action.payload,
			}
		case 'SEARCH_ITEM':
			return {
				...state,
				term: action.payload,
			}
		case 'ADD_ITEM':
			return {
				...state,
				todoData: updateTodoItems(
					state.todoData,
					action.payload,
					'add'
				),
			}
		case 'DELETE_ITEM':
			return {
				...state,
				todoData: updateTodoItems(
					state.todoData,
					action.payload,
					'remove'
				),
			}
		case 'TOGGLE_DONE':
			return {
				...state,
				todoData: onDoneImportant(
					state.todoData,
					action.payload,
					'done'
				),
			}
		case 'TOGGLE_IMPORTANT':
			return {
				...state,
				todoData: onDoneImportant(
					state.todoData,
					action.payload,
					'important'
				),
			}
		default:
			return state
	}
}

export default reducer
