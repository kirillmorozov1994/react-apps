import {
	changeCurrentSearch,
	changeLastSearch,
	setCurrentPage,
	fetchReposRequest,
	fetchReposSuccess,
	fetchReposFailure,
} from './actions'

let timeoutId = 0

const validateUrl = (history, targetUrl) => {
	const currentUrl = history.location.pathname
	if (currentUrl !== targetUrl) {
		history.push(targetUrl)
	}
}

const requestInitRepos = (term, service, history) => (dispatch, getState) => {
	dispatch(changeCurrentSearch(term))
	dispatch(changeLastSearch(term))
	requestRepos(dispatch, service, term, history, getState)
}

const requestEnterRepos = (term, service, history) => (dispatch, getState) => {
	dispatch(changeCurrentSearch(term))
	const current = getState().currentSearch
	const last = getState().lastSearch
	if (last !== current) {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			dispatch(changeLastSearch(term))
			dispatch(setCurrentPage(1))
			requestRepos(dispatch, service, term, history, getState)
		}, 1500)
	} else {
		clearTimeout(timeoutId)
	}
}

const requestChangePage = (nextOrPrevPage, service, history) => (
	dispatch,
	getState
) => {
	if (nextOrPrevPage !== getState().currentPage) {
		dispatch(setCurrentPage(nextOrPrevPage))
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			requestRepos(
				dispatch,
				service,
				getState().currentSearch,
				history,
				getState
			)
		}, 800)
	}
}

const requestRepos = (dispatch, service, term, history, getState) => {
	if (term === '') {
		validateUrl(history, `/repos/-/${getState().currentPage}`)
	} else {
		validateUrl(history, `/repos/${term}/${getState().currentPage}`)
	}
	dispatch(fetchReposRequest())
	service
		.getRepositories(term, getState().currentPage)
		.then((data) => dispatch(fetchReposSuccess(data)))
		.catch((error) => dispatch(fetchReposFailure(error)))
}

export { requestInitRepos, requestEnterRepos, requestChangePage, requestRepos }
