import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { withContextService } from '../hoc/with-context-service'
import { connect } from 'react-redux'
import {
	fetchReposRequest,
	fetchReposFailure,
	getDetailsRepos,
} from '../../actions/actions'
import Spinner from '../spinner/spinner'
import star from '../../assets/img/star.png'
import PropTypes from 'prop-types'

class Cart extends Component {
	content = null

	componentDidMount() {
		this.initRequestRepos()
	}

	initRequestRepos = () => {
		const { match, history } = this.props
		const { login } = match.params
		const { name } = match.params
		if (login === undefined || name === undefined) {
			history.push('/repos/-/1')
		} else {
			this.requestRepos(`${login}/${name}`)
		}
	}

	requestRepos = (url) => {
		const {
			service,
			getDetailsRepos,
			fetchReposRequest,
			fetchReposFailure,
		} = this.props
		fetchReposRequest()
		service
			.requestRepository(url)
			.then((data) => {
				if (data === 'Not Found') {
					getDetailsRepos(data)
				} else {
					getDetailsRepos(data)
				}
			})
			.catch((error) => fetchReposFailure(error))
	}

	createCartRepos = (cartRepos) => {
		const { user, repos, lang, contr } = cartRepos
		const cart = (
			<>
				<div className="cart-user">
					<div className="cart-user-wrap">
						<img
							src={user.avatarUrl}
							className="cart-user-wrap__img"
							alt="img-user"
						/>
					</div>
					<div className="cart-user-nikName">
						<a
							href={user.linkUser}
							className="cart-user-nikName__url"
							target="_blank"
							rel="noopener noreferrer"
						>
							{user.name}
						</a>
					</div>
				</div>
				<div className="cart-repos">
					<div className="cart-repos-text">
						<div className="cart-repos-text__name">
							<a
								href={repos.linkRepos}
								target="_blank"
								rel="noopener noreferrer"
							>
								{repos.name}
							</a>
						</div>
						<div className="cart-repos-text__desc">{repos.desc}</div>
						<div className="cart-repos-text__date">
							Дата последнего коммита:&nbsp;{repos.dateCommit}
						</div>
					</div>
					<div className="cart-repos-desc">
						<div className="cart-repos-desc__stars">
							<img src={star} alt="img-stars" />
							<div>{repos.stars}</div>
						</div>
						<div className="cart-repos-desc__lang">
							Используемые языки:
							<ul>
								{lang.map((str) => (
									<li key={str}>
										<a
											href={`https://ru.wikipedia.org/wiki/${str}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											{str}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="cart-repos-desc__contr">
							Контрибьютеры:
							<ul>
								{contr.map((str, i) => (
									<li key={str}>
										{`${i + 1}. `}
										{str}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</>
		)
		return cart
	}

	render() {
		const { cartRepos, loading } = this.props

		if (loading) {
			this.content = <Spinner />
		} else {
			this.content =
				cartRepos === 'Not Found' ? (
					<div className="cart-repos-notFound">
						Репозиторий по Вашему запросу не найден!
					</div>
				) : (
					cartRepos && this.createCartRepos(cartRepos)
				)
		}

		return this.content
	}
}

Cart.defaultProps = {
	cartRepos: null,
	error: null,
	loading: true,
}

Cart.propTypes = {
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	service: PropTypes.object.isRequired,
	getDetailsRepos: PropTypes.func.isRequired,
	fetchReposRequest: PropTypes.func.isRequired,
	fetchReposFailure: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	error: PropTypes.any,
	cartRepos: PropTypes.any,
}

const mapStateToProps = ({ loading, error, cartRepos }) => {
	return {
		cartRepos,
		loading,
		error,
	}
}

const mapStateToDispatch = (dispatch) => ({
	getDetailsRepos: (data) => dispatch(getDetailsRepos(data)),
	fetchReposRequest: () => dispatch(fetchReposRequest()),
	fetchReposFailure: (error) => dispatch(fetchReposFailure(error)),
})

export default compose(
	withContextService(),
	withRouter,
	connect(mapStateToProps, mapStateToDispatch)
)(Cart)
