import React from 'react'
import './error-indicator.css'
import icon from './error-icon.png'

const ErrorIndicator = () => {
	return (
		<div className="error-indicator">
			<img src={icon} alt="error icon" />
			<span className="boom">BOOM!</span>
			<span>Unexpected error</span>
			<span>(but we already sent librarian to fix it)</span>
		</div>
	)
}

export default ErrorIndicator
