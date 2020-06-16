import React from 'react'

const withChildFunction = (fn) => (Wrapper) => {
	return (props) => {
		return <Wrapper {...props}>{fn}</Wrapper>
	}
}

export default withChildFunction
