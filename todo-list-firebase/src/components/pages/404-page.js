import React from 'react'
import { Link } from 'react-router-dom'
import error404 from '../../assets/img/404-page/404-page.png'

const NotFount = () => {
	return (
		<div className="error-not-found">
			<img src={error404} alt="Error-404" />
			<Link className="back-home" to="/">
				Homepage
			</Link>
		</div>
	)
}

export default NotFount
