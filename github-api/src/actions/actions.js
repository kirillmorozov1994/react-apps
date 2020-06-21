const fetchReposRequest = () => ({
	type: 'FETCH_DATA_REQUEST',
})

const fetchReposSuccess = (data) => ({
	type: 'FETCH_REPOS_SUCCESS',
	payload: data,
})

const fetchReposFailure = (error) => ({
	type: 'FETCH_DATA_FAILURE',
	payload: error,
})

const changeCurrentSearch = (currentTerm) => ({
	type: 'CHANGE_CURRENT_SEARCH',
	payload: currentTerm,
})

const changeLastSearch = (lastTerm) => ({
	type: 'CHANGE_LAST_SEARCH',
	payload: lastTerm,
})

const setCurrentPage = (page) => ({
	type: 'SET_CURRENT_PAGE',
	payload: page,
})

const getDetailsRepos = (dataRepos) => ({
	type: 'FETCH_DETAILS_SUCCESS',
	payload: dataRepos,
})

const clearState = () => {
	return {
		type: 'CLEAR_STATE',
	}
}

export {
	fetchReposRequest,
	fetchReposSuccess,
	fetchReposFailure,
	changeCurrentSearch,
	changeLastSearch,
	setCurrentPage,
	getDetailsRepos,
	clearState,
}
