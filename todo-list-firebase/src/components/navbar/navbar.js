import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { changeLang } from '../../actions/action-todo-list/action-todo-list'

const Navbar = ({ navbar, changeLang }) => {
	const [lang, setLang] = useState('en')

	const changeLanguage = (e) => {
		setLang(e.target.value)
		changeLang(e.target.value)
	}

	return (
		<nav className="navbar navbar-dark navbar-expand bg-primary justify-content-between mb-3">
			<div className="d-flex">
				<div className="navbar-brand">{navbar.title}</div>
				<ul className="navbar-nav">
					<li className="nav-item">
						<NavLink className="nav-link" to="/" exact>
							{navbar.pages[0]}
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/about">
							{navbar.pages[1]}
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="select-lang">
				<select
					onChange={changeLanguage}
					className="custom-select"
					value={lang}
				>
					<option value="en">en</option>
					<option value="ru">ru</option>
				</select>
			</div>
		</nav>
	)
}

Navbar.defaultProps = {
	navbar: {
		title: 'Todo List',
		pages: ['Home', 'About'],
	},
}

Navbar.propTypes = {
	navbar: PropTypes.shape({
		title: PropTypes.string,
		pages: PropTypes.arrayOf(PropTypes.string),
	}),
	changeLang: PropTypes.func.isRequired,
}

const mapStateToProps = ({
	settingLang: {
		content: { navbar },
	},
}) => {
	return {
		navbar,
	}
}

const mapDispatchToProps = {
	changeLang,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
