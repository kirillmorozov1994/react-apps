import React from 'react'
import { ConsumerContext } from '../context/context'

const withContextService = () => (Component) => {
	return (props) => {
		return (
			<ConsumerContext>
				{(service) => {
					return <Component service={service} {...props} />
				}}
			</ConsumerContext>
		)
	}
}

export { withContextService }
