import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default class Header extends Component {
	render() {
		const { onChangeService } = this.props

		return (
			<div className="header d-md-flex">
				<h3 className="mr-5">
					<Link to="/">Star DB</Link>
				</h3>
				<ul className="d-md-flex pl-0">
					<li className="pl-0 pr-0 mr-3">
						<Link to="/people/"> People </Link>
					</li>
					<li className="pl-0 pr-0 mr-3">
						<Link to="/planets/">Planets</Link>
					</li>
					<li className="pl-0 pr-0 mr-3">
						<Link to="/starships/">Starships</Link>
					</li>
					<li className="pl-0 pr-0 mr-3">
						<Link to="/login">Login</Link>
					</li>
					<li className="pl-0 pr-0 mr-3">
						<Link to="/secret">Secret</Link>
					</li>
					<button
						className="btn btn-primary btn-sm change-service"
						onClick={onChangeService}
					>
						Change Service
					</button>
				</ul>
			</div>
		)
	}
}
