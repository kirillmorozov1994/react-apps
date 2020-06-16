import React from 'react';
import PropTypes from 'prop-types';
import './item-list.css';

const ItemList = ({ data, children: renderItem, onItemSelected}) => {

		const items = data.map((item) => {
			const label = renderItem(item);
			return (
				<li className="list-group-item"
					key={item.id}
					onClick={() => onItemSelected(item.id)}
				>
					{label}
				</li>
			);
		});

		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		)
}

ItemList.defaultProps = {
	onItemSelected: () => {}
}

ItemList.propTypes = {
	onItemSelected: PropTypes.func,
	children: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ItemList;