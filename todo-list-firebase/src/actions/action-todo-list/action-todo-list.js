const addedItemList = (item) => {
	return {
		type: 'ADDED_ITEM_LIST',
		payload: item,
	}
}

const removeItemList = (id) => {
	return {
		type: 'REMOVE_ITEM_LIST',
		payload: id,
	}
}

const onImportantItem = (id) => {
	return {
		type: 'ON_IMPORTANT_ITEM',
		payload: id,
	}
}

const onDoneItem = (id) => {
	return {
		type: 'ON_DONE_ITEM',
		payload: id,
	}
}

const fetchListRequest = () => {
	return {
		type: 'FETCH_LIST_REQUEST',
	}
}

const fetchListSuccess = (todoList) => {
	return {
		type: 'FETCH_LIST_SUCCESS',
		payload: todoList,
	}
}

const fetchListFailuer = (error) => {
	return {
		type: 'FETCH_LIST_FAILURE',
		payload: error,
	}
}

const searchInput = (search) => {
	return {
		type: 'SEARCH_ITEM',
		payload: search,
	}
}

const filterItem = (filter) => {
	return {
		type: 'FILTER_ITEM',
		payload: filter,
	}
}

const changeLang = (lang) => {
	return {
		type: 'CHANGE_LANGUAGE',
		payload: lang,
	}
}

export {
	removeItemList,
	addedItemList,
	onImportantItem,
	onDoneItem,
	fetchListRequest,
	fetchListSuccess,
	fetchListFailuer,
	searchInput,
	filterItem,
	changeLang,
}
