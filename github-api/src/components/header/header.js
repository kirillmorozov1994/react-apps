import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className="header">
			<h2 className="header-title">
				<Link to="/" className="header-title-link">
					GitHub Dashboard
				</Link>
			</h2>
		</header>
	)
}

export default Header
