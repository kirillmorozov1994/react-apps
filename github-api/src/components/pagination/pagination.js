import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withContextService } from '../hoc/with-context-service'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { requestChangePage } from '../../actions/actions-request'

class Pagination extends Component {
	difference = 0
	countPages = this.props.perPaginate

	componentDidUpdate() {
		const { currentPage, totalCount, requestChangePage } = this.props

		if (currentPage > totalCount && totalCount !== null) {
			requestChangePage(totalCount)
		} else if (currentPage < 1 && totalCount !== null) {
			requestChangePage(1)
		}
	}

	createItemsPage = () => {
		const {
			currentPage,
			perPaginate,
			totalCount,
			requestChangePage,
		} = this.props

		if (!totalCount) {
			return null
		}

		if (currentPage > totalCount) {
			return null
		}

		if (totalCount < perPaginate) {
			this.countPages = totalCount
		} else {
			this.countPages = perPaginate
		}

		if (
			currentPage >= totalCount - this.countPages + 1 &&
			currentPage <= totalCount
		) {
			this.difference = currentPage - (totalCount - this.countPages + 1)
		}

		const perPagesPagination = Array(this.countPages)
			.fill('')
			.map((_, i) => (
				<li
					key={currentPage - this.difference + i}
					className="pagination-list-item"
				>
					<button
						className={
							i === 0 + this.difference
								? 'pagination-list-item-btn active'
								: 'pagination-list-item-btn'
						}
						onClick={() => requestChangePage(currentPage - this.difference + i)}
					>
						{currentPage - this.difference + i}
					</button>
				</li>
			))

		const arrowPrevPagination = (
			<li key="arrow-prev" className="pagination-list-item">
				<button
					className="pagination-list-item-btn"
					disabled={currentPage - 1 <= this.countPages - 1 && currentPage === 1}
					onClick={() => requestChangePage(currentPage - 1)}
				>
					{'<<'}
				</button>
			</li>
		)

		const arrowNextPagination = (
			<li key="arrow-next" className="pagination-list-item">
				<button
					className="pagination-list-item-btn"
					disabled={
						totalCount - this.countPages + 1 <= currentPage &&
						currentPage === totalCount
					}
					onClick={() => requestChangePage(currentPage + 1)}
				>
					{'>>'}
				</button>
			</li>
		)

		const pages = [
			arrowPrevPagination,
			...perPagesPagination,
			arrowNextPagination,
		]

		return pages
	}

	render() {
		const pages = this.createItemsPage()

		return (
			<div className="pagination">
				<ul className="pagination-list">{pages}</ul>
			</div>
		)
	}
}

Pagination.defaultProps = {
	currentPage: 1,
	perPaginate: 1,
	totalCount: 1,
}

Pagination.propTypes = {
	currentPage: PropTypes.number,
	perPaginate: PropTypes.number,
	totalCount: PropTypes.number,
	requestChangePage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ currentPage, perPaginate, totalCount }) => ({
	currentPage,
	perPaginate,
	totalCount,
})

const mapDispatchToProps = (dispatch, { service, history }) => ({
	requestChangePage: (nextOrLastPage) =>
		dispatch(requestChangePage(nextOrLastPage, service, history)),
})

export default compose(
	withContextService(),
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Pagination)
