import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hide } from '../../actions/action-alert/action-alert'
import { CSSTransition } from 'react-transition-group'

const Alert = ({ visible, type, title, text, hide }) => {
	return (
		<CSSTransition
			in={visible}
			timeout={500}
			classNames="alert"
			mountOnEnter
			unmountOnExit
		>
			<div className={`alert alert-${type} alert-dismissible`}>
				<strong>{title}!</strong> {text}
				<button
					type="button"
					className="close"
					aria-label="Close"
					onClick={hide}
				>
					<span aria-hidden="true">×</span>
				</button>
			</div>
		</CSSTransition>
	)
}

Alert.defaultProps = {
	visible: false,
	type: 'warning',
	title: 'Warning',
	text: 'Unknown error',
	hide: () => console.warn('Function "hide" not passed as props'),
}

Alert.propTypes = {
	visible: PropTypes.bool,
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	hide: PropTypes.func.isRequired,
}

const mapStateToProps = ({ alert }) => {
	return {
		...alert,
	}
}

const mapDispatchToProps = {
	hide,
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
