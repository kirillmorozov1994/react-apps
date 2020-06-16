import { setLang, onImportantOrDone } from './utils'

const initialState = {
	alert: {
		visible: false,
	},
	loading: true,
	search: '',
	filter: 'all',
	settingLang: {
		content: setLang('en'),
	},
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SHOW_ALERT':
			return {
				...state,
				alert: {
					type: action.payload.type,
					title: action.payload.title,
					text: action.payload.text,
					visible: true,
				},
			}
		case 'HIDE_ALERT':
			return {
				...state,
				alert: {
					...state.alert,
					visible: false,
				},
			}
		case 'FETCH_LIST_REQUEST':
			return {
				...state,
				loading: true,
			}
		case 'FETCH_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				todoList: action.payload,
			}
		case 'FETCH_LIST_FAILURE':
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case 'ADDED_ITEM_LIST':
			return {
				...state,
				todoList: [...state.todoList, action.payload],
			}
		case 'REMOVE_ITEM_LIST':
			const index = state.todoList.findIndex(
				({ id }) => id === action.payload
			)
			const newTodoList = [
				...state.todoList.slice(0, index),
				...state.todoList.slice(index + 1),
			]

			return {
				...state,
				todoList: newTodoList,
			}
		case 'ON_DONE_ITEM':
			return {
				...state,
				todoList: onImportantOrDone(
					state.todoList,
					action.payload,
					'done'
				),
			}
		case 'ON_IMPORTANT_ITEM':
			return {
				...state,
				todoList: onImportantOrDone(
					state.todoList,
					action.payload,
					'important'
				),
			}
		case 'SEARCH_ITEM':
			return {
				...state,
				search: action.payload,
			}
		case 'FILTER_ITEM':
			return {
				...state,
				filter: action.payload,
			}
		case 'CHANGE_LANGUAGE':
			return {
				...state,
				settingLang: {
					content: setLang(action.payload),
				},
			}
		default:
			return state
	}
}

export default reducer
