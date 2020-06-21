import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import error404 from '../../assets/img/404.png'
import { connect } from 'react-redux'
import { clearState } from '../../actions/actions'

const NotFoundPage = ({ clearState }) => {
	//elsint-disable-next-line
	useEffect(() => () => clearState(), [clearState])

	return (
		<div className="not-found">
			<div className="not-found-content">
				<div className="not-found-content__title">404</div>
				<div className="not-found-content__wrapper">
					<div className="not-found-content__text">
						This is not the web page you are looking for.
					</div>
					<div className="not-found-content__arrow"></div>
				</div>
			</div>
			<img className="not-found-img" src={error404} alt="img-not-found" />
		</div>
	)
}

NotFoundPage.propTypes = {
	clearState: PropTypes.func.isRequired,
}

export default connect(() => ({}), { clearState })(NotFoundPage)
