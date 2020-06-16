import React from 'react'
import icon from '../../assets/img/error-indicator/error-icon.png'

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
