import React, { useEffect } from 'react'
import Cart from '../cart/cart'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { clearState } from '../../actions/actions'

const CartPage = ({ clearState }) => {
	//eslint-disable-next-line
	useEffect(() => () => clearState(), [])

	return (
		<div className="cart">
			<Cart />
		</div>
	)
}

CartPage.propTypes = {
	clearState: PropTypes.func.isRequired,
}

export default connect(() => ({}), { clearState })(CartPage)
