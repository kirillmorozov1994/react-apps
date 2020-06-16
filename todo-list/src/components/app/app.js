import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './app.css'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import ItemStatusFilter from '../item-status-filter'
import TodoList from '../todo-list'
import ItemAddForm from '../item-add-form'
import * as actions from '../../actions'

class App extends Component {
	componentDidMount() {
		this.props.initialData()
	}

	onChangeFilter = (filter) => {
		this.props.changeFilter(filter)
	}

	onSearchItem = (term) => {
		this.props.searchItem(term)
	}

	onAddedItem = (label) => {
		this.props.addTodoItem(label)
	}

	onDeleteItem = (id) => {
		this.props.deleteTodoItem(id)
	}

	onDoneItem = (id) => {
		this.props.itemDone(id)
	}

	onImportantItem = (id) => {
		this.props.itemImportant(id)
	}

	search(arr, term) {
		if (term.length === 0) {
			return arr
		} else {
			return arr.filter(
				({ label }) =>
					label
						.toLocaleLowerCase()
						.indexOf(term.toLocaleLowerCase()) > -1
			)
		}
	}

	filter(arr, prop) {
		switch (prop) {
			case 'all':
				return arr
			case 'done':
				return arr.filter(({ done }) => done)
			case 'active':
				return arr.filter(({ done }) => !done)
			default:
				return arr
		}
	}

	render() {
		const { todoData, term, filter } = this.props

		const filterItems = this.filter(this.search(todoData, term), filter)

		const countDone = filterItems.filter(({ done }) => done).length
		const countNotDone = filterItems.length - countDone

		return (
			<div className="todo-app">
				<AppHeader toDo={countNotDone} done={countDone} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchItem={this.onSearchItem} />
					<ItemStatusFilter
						filter={filter}
						onChangeFilter={this.onChangeFilter}
					/>
				</div>

				<TodoList
					todoData={filterItems}
					onDoneItem={this.onDoneItem}
					onImportantItem={this.onImportantItem}
					onDeleteItem={this.onDeleteItem}
				/>
				<ItemAddForm onAddedItem={this.onAddedItem} />
			</div>
		)
	}
}

const mapStateToProps = ({ todoData, term, filter }) => {
	return {
		todoData,
		term,
		filter,
	}
}

export default connect(mapStateToProps, actions)(App)
