import React from 'react'
import TodoListItem from '../todo-list-item/todo-list-item'
import { Fade } from 'react-reveal'
import './todo-list.css'

export default ({ todoData, onDoneItem, onImportantItem, onDeleteItem }) => {
	const data = todoData.map(({ label, important, done, id }) => {
		return (
			<Fade key={id} bottom collapse>
				<TodoListItem
					label={label}
					important={important}
					done={done}
					onDoneItem={() => {
						onDoneItem(id)
					}}
					onImportantItem={() => {
						onImportantItem(id)
					}}
					onDeleteItem={() => {
						onDeleteItem(id)
					}}
				/>
			</Fade>
		)
	})

	return <ul className="list-group todo-list">{data}</ul>
}
