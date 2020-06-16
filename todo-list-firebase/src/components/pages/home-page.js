import React, { Fragment } from 'react'
import Alert from '../alert'
import ItemAddForm from '../item-add-form'
import FilterItem from '../filter-item'
import ItemList from '../item-list'
import { RoutePage } from '../hoc'

const HomePage = () => {
	return (
		<Fragment>
			<Alert />
			<ItemAddForm />
			<hr />
			<FilterItem />
			<ItemList />
		</Fragment>
	)
}

export default RoutePage(HomePage)
