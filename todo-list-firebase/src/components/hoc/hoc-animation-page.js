import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

const RoutePage = (Component) => {
	return ({ path, classAnimation, timeout }) => {
		return (
			<Route path={path} exact>
				{({ match }) => (
					<CSSTransition
						in={match != null}
						appear
						unmountOnExit
						timeout={timeout}
						classNames={classAnimation}
					>
						<div className="page">
							<Component />
						</div>
					</CSSTransition>
				)}
			</Route>
		)
	}
}

RoutePage.propTypes = {
	Component: PropTypes.element.isRequired,
}

export default RoutePage
