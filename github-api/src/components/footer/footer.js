import React from 'react'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-created">Created by React</div>
			<div className="footer-contacts">
				<div className="footer-contacts-author">Автор: Кирилл Морозов</div>
				<ul className="footer-contacts__wrapper">
					<li className="footer-contacts__wrapper-element">
						<a href="https://github.com/kirillmorozov1994">
							<i className="fab fa-github-square"></i>
						</a>
					</li>
					<li className="footer-contacts__wrapper-element">
						<a href="mailto:kirill.morozov_1994@mail.ru">
							<i className="fas fa-envelope"></i>
						</a>
					</li>
					<li className="footer-contacts__wrapper-element">
						<a href="https://vk.com/kirson.morozov">
							<i className="fab fa-vk"></i>
						</a>
					</li>
					<li className="footer-contacts__wrapper-element">
						<a href="https://t.me/Kirll_1994">
							<i className="fab fa-telegram"></i>
						</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
