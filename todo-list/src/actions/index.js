const initialData = () => {
	return {
		type: 'INITIAL_DATA'
	}
}

const changeFilter = (filter) => {
	return {
		type: 'CHANGE_FILTER',
		payload: filter
	}
}

const searchItem = (term) => {
	return {
		type: 'SEARCH_ITEM',
		payload: term
	}
}

const addTodoItem = (label) => {
	return {
		type: 'ADD_ITEM',
		payload: label
	}
}

const deleteTodoItem = (id) => {
	return {
		type: 'DELETE_ITEM',
		payload: id
	}
}

const itemImportant = (id) => {
	return {
		type: 'TOGGLE_IMPORTANT',
		payload: id
	}
}

const itemDone = (id) => {
	return {
		type: 'TOGGLE_DONE',
		payload: id
	}
}

export {
	initialData,
	changeFilter,
	searchItem,
	addTodoItem,
	deleteTodoItem,
	itemImportant,
	itemDone
}