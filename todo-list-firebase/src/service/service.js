import axios from 'axios'

export default class ServiceTodoList {
	_urlDB = 'https://todoapp-e60bb.firebaseio.com'

	getTodoList = async () => {
		const response = await axios.get(`${this._urlDB}/notes.json`)
		return this._transfromTodoList(response.data)
	}

	addTodoLisItem = async (item) => {
		return await axios.post(`${this._urlDB}/notes.json`, item)
	}

	editTodoLisItem = async (id, item) => {
		return await axios.put(`${this._urlDB}/notes/${id}.json`, item)
	}

	removeTodoListItem = async (id) => {
		return await axios.delete(`${this._urlDB}/notes/${id}.json`)
	}

	_transfromTodoList = (data) => {
		return Object.keys(data).map((id) => ({ id, ...data[id] }))
	}
}
