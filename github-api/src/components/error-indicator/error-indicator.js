import React from 'react'
import electrocat from '../../assets/img/electrocat.png'

const ErrorIndicator = () => {
	return (
		<div className="fatal-error">
			<img className="fatal-error-img" src={electrocat} alt="img-error" />
			<div className="fatal-error-message">
				Если ты видишь данное сообщение, значит произошла фатальная ошибка в
				работе сайта! <br /> Мы делаем всё возможное, чтобы устранить данную
				неполадку.
			</div>
		</div>
	)
}

export default ErrorIndicator
