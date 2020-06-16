import React from 'react'
import { connect } from 'react-redux'
import {
	bookRemovedFromCart,
	allBookRemovedFromCart,
	bookAddedToCart,
} from '../../actions'
import './shopping-cart-table.css'

const ShoppingCartTable = ({
	items,
	total,
	onDecrease,
	onIncrease,
	onDelete,
}) => {
	if (+items.length === 0) {
		return <h2 style={{ textAlign: 'center' }}>Your basket is empty</h2>
	}

	const renderRow = (item, idx) => {
		const { id, title, count, total } = item
		return (
			<tr key={id}>
				<td>{idx + 1}</td>
				<td>{title}</td>
				<td>{count}</td>
				<td>${total}</td>
				<td>
					<button
						className="btn btn-outline-danger btn-sm float-right"
						onClick={() => onDelete(id)}
					>
						<i className="fa fa-trash-o" />
					</button>
					<button
						className="btn btn-outline-success btn-sm float-right"
						onClick={() => onIncrease(id)}
					>
						<i className="fa fa-plus-circle" />
					</button>
					<button
						className="btn btn-outline-warning btn-sm float-right"
						onClick={() => onDecrease(id)}
					>
						<i className="fa fa-minus-circle" />
					</button>
				</td>
			</tr>
		)
	}

	return (
		<div className="shopping-cart-table">
			<h2>Your Order</h2>
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Item</th>
						<th>Count</th>
						<th>Price</th>
					</tr>
				</thead>

				<tbody>{items.map(renderRow)}</tbody>
			</table>

			<div className="total">Total: ${total}</div>
		</div>
	)
}

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => {
	return {
		items: cartItems,
		total: orderTotal,
	}
}

const mapDispatchToProps = {
	onDecrease: bookRemovedFromCart,

	onIncrease: bookAddedToCart,

	onDelete: allBookRemovedFromCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)
