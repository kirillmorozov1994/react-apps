import React, { Component } from 'react'
import ErrorButton from '../error-button'
import Spinner from '../spinner'
import ErrorBoundry from '../error-boundry'
import './item-details.css'
import ErrorIndicator from '../error-indicator'

class ItemDetails extends Component {
	state = {
		item: null,
		loading: true,
		image: null,
	}

	componentDidMount() {
		this.updatePerson()
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.itemId !== prevProps.itemId ||
			this.props.getData !== prevProps.getData ||
			this.props.getImageUrl !== prevProps.getImageUrl
		) {
			this.setState({ loading: !prevState.loading, item: null })
			this.updatePerson()
		}
	}

	updatePerson() {
		const { itemId, getData, getImageUrl } = this.props
		if (!itemId) {
			return
		}
		getData(itemId)
			.then((item) =>
				this.setState({
					item,
					loading: false,
					image: getImageUrl(item),
				})
			)
			.catch(this.onErrorLoaded)
	}

	onErrorLoaded = () => {
		this.setState({
			loading: false,
			error: true,
		})
	}

	render() {
		const { item, loading, image, error } = this.state
		const { itemId } = this.props

		if (!itemId) {
			return <h2> Please selected person from get detail data people </h2>
		}

		if (error) {
			return <ErrorIndicator />
		}

		if (loading || !item) {
			return <Spinner />
		}

		return (
			<div className="person-details card">
				<ErrorBoundry>
					<img className="person-image" src={image} alt="" />

					<div className="card-body">
						<h4>{item.name}</h4>
						<ul className="list-group list-group-flush">
							{React.Children.map(this.props.children, (child) => {
								return React.cloneElement(child, {
									item,
								})
							})}
						</ul>
						<ErrorButton />
					</div>
				</ErrorBoundry>
			</div>
		)
	}
}

export default ItemDetails
