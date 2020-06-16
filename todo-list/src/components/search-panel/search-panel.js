import React, { Component } from 'react'
import './search-panel.css'

export default class SearchPanel extends Component {
	state = {
		term: '',
	}

	onSearchItem = (e) => {
		this.setState({
			term: e.target.value,
		})
		this.props.onSearchItem(e.target.value)
	}

	render() {
		return (
			<input
				type="search"
				placeholder="Type here to search"
				className="form-control search-input"
				onChange={this.onSearchItem}
				value={this.state.term}
			/>
		)
	}
}
