const initialData = {
	loading: true,
	error: null,
	listRepos: null,
	cartRepos: null,
	totalCount: null,
	currentPage: 1,
	perPaginate: 5,
	currentSearch: '',
	lastSearch: '',
}

const requestSuccess = (success) => {
	let dataClear
	if (success === 'repos') {
		dataClear = {
			cartRepos: null,
		}
	} else {
		dataClear = {
			listRepos: null,
			totalCount: null,
		}
	}
	return {
		error: null,
		loading: false,
		...dataClear,
	}
}

const reducer = (state = initialData, action) => {
	switch (action.type) {
		case 'FETCH_DATA_REQUEST':
			return {
				...state,
				loading: true,
				error: null,
			}
		case 'FETCH_REPOS_SUCCESS':
			return {
				...state,
				...requestSuccess('repos'),
				listRepos: action.payload.listItems,
				totalCount: action.payload.totalCount,
			}
		case 'FETCH_DETAILS_SUCCESS':
			return {
				...state,
				...requestSuccess(),
				cartRepos: action.payload,
			}
		case 'FETCH_DATA_FAILURE':
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case 'CLEAR_STATE':
			return {
				...initialData,
			}
		case 'CHANGE_CURRENT_SEARCH':
			return {
				...state,
				currentSearch: action.payload,
			}
		case 'CHANGE_LAST_SEARCH':
			return {
				...state,
				lastSearch: action.payload,
			}
		case 'SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.payload,
			}
		case 'NOT_FOUND_CART':
			return {
				...state,
				cartRepos: null,
			}
		default:
			return state
	}
}

export { reducer }
