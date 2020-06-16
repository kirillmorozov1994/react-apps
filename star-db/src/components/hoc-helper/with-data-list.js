import React, { Component } from 'react'
import Spinner from '../spinner'
import ErrorBoundry from '../error-boundry'
import ErrorIndicator from '../error-indicator'

const withData = (View) => {
	return class extends Component {
		state = {
			data: null,
			loading: true,
			error: false,
		}

		componentDidMount() {
			this.update()
		}

		update() {
			this.props
				.getData()
				.then((data) => {
					this.setState({
						data,
						loading: false,
					})
				})
				.catch(this.onErrorLoaded)
		}

		onErrorLoaded() {
			this.setState({
				loading: false,
				error: true,
			})
		}

		componentDidUpdate(prevProps) {
			if (this.props.getData !== prevProps.getData) {
				this.update()
			}
		}

		render() {
			const props = this.props

			const { data, error, loading } = this.state

			if (error) {
				return <ErrorIndicator />
			}

			if (loading) {
				return <Spinner />
			}

			return (
				<ErrorBoundry>
					<View {...props} data={data} />
				</ErrorBoundry>
			)
		}
	}
}

export default withData
