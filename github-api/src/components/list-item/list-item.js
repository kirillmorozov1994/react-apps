import React from 'react'
import PropTypes from 'prop-types'
import star from '../../assets/img/star.png'
import { Link } from 'react-router-dom'

const ListItem = ({ name, stars, dateCommit, login, fullName, urlAccount }) => {
	return (
		<li className="list-item">
			<span className="list-item-name list-item-text">
				Repos:&nbsp;
				<Link to={`/cart/${fullName}`}>{name}</Link>
			</span>
			<span className="list-item-stars list-item-text">
				<img src={star} alt="img-star" /> {stars}
			</span>
			<span className="list-item-date list-item-text">
				Last commit: {dateCommit}
			</span>
			<span className="list-item-link list-item-text">
				Login:&nbsp;{' '}
				<a href={urlAccount} target="_blank" rel="noopener noreferrer">
					{login}
				</a>
			</span>
		</li>
	)
}

ListItem.defaultProps = {
	name: 'Репозиторий',
	stars: 0,
	dateCommit: new Date().toLocaleString(),
	login: 'Псевдоним',
	fullName: 'kirillmorozov1994/react-apps',
	urlAccount: 'https://github.com/kirillmorozov1994',
}

ListItem.propTypes = {
	name: PropTypes.string,
	dateCommit: PropTypes.string,
	login: PropTypes.string,
	fullName: PropTypes.string,
	urlAccount: PropTypes.string,
	stars: PropTypes.number,
}

export default ListItem
