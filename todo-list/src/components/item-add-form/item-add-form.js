import React, { Component } from 'react'
import './item-add-form.css'

export default class ItemAddForm extends Component {
	state = {
		label: '',
	}

	onChangeLabel = (e) => {
		this.setState({
			label: e.target.value,
		})
	}

	onSubmitForm = (e) => {
		e.preventDefault()
		const { onAddedItem } = this.props
		const { label } = this.state
		if (label.length === 0) {
			return
		}
		onAddedItem(label)
		this.setState({
			label: '',
		})
	}

	render() {
		return (
			<form className="item-add-form d-flex" onSubmit={this.onSubmitForm}>
				<input
					type="text"
					className="form-control"
					placeholder="What needs to be done"
					onChange={this.onChangeLabel}
					value={this.state.label}
				/>
				<button className="btn btn-outline-secondary">addItem</button>
			</form>
		)
	}
}
