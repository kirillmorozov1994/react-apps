import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import './scss/slider-zoom.scss'

export class SliderZoom extends Component {
	static defaultProps = {
		zoom: true,
		currentImg: 'https://www.argo-oboi.com.ua/wp-content/uploads/2017/08/thumb_l_0417.jpg',
		images: [
			'https://www.argo-oboi.com.ua/wp-content/uploads/2017/08/thumb_l_0417.jpg',
			'https://wallscloud.net/uploads/cache/2845750753/moraine-lake-canada-48E2-1024x576-MM-90.jpg',
			'https://overmirror.ru/assets/images/FOTOP/priroda/14.jpg',
			'https://cdn.humoraf.ru/wp-content/uploads/2017/08/beautiful-pictures-on-the-desktop-summer-nature-21.jpg',
			'https://naim27.ru/sites/default/files/rewalls.com-18432.jpg',
		],
		preview: 3,
		animation: true,
	}

	static propTypes = {
		zoom: PropTypes.bool,
		currentImg: PropTypes.string,
		images: PropTypes.arrayOf(PropTypes.string),
		preview: PropTypes.number,
		animation: PropTypes.bool,
	}

	messageWarning = null
	cursor = React.createRef(null)

	state = {
		zoom: this.props.zoom,
		currentImg: this.props.images[0],
		images: this.props.images,
		preview: Number.parseInt(this.props.preview),
		animation: this.props.animation,
		currentSlide: 0,
	}

	validateOptions = () => {
		const { images, preview, zoom, animation } = this.state
		if (!Array.isArray(images)) {
			this.messageWarning = `Свойство IMAGES должно быть массивом, текущий тип: ${typeof images}`
			return false
		}
		if (images.length < 4) {
			this.messageWarning = `Длина массива IMAGES должна быть не менее 3 элементов, текущая длина: ${images.length}`
			return false
		}
		if (typeof preview !== 'number') {
			this.messageWarning = `Свойство PREVIEW должно быть числом, текущее значение: ${preview}`
			return false
		}
		if (preview < 3) {
			this.messageWarning = `Свойство PREVIEW должно быть иметь значение не меньше 3, текущее значение: ${preview}`
			return false
		}
		if (typeof zoom !== 'boolean') {
			this.messageWarning = `Свойство ZOOM должно быть булевым значением, текущее тип: ${typeof zoom}`
			return false
		}
		if (typeof animation !== 'boolean') {
			this.messageWarning = `Свойство ANIMATION должно быть булевым значением, текущее тип: ${typeof animation}`
			return false
		}
		return true
	}

	nextSlide = () => {
		this.setState(({ images, preview, currentSlide }) => {
			if (currentSlide < images.length - preview) {
				return {
					currentSlide: currentSlide + 1,
				}
			} else {
				return {
					currentSlide: currentSlide,
				}
			}
		})
	}

	prevSlide = () => {
		this.setState(({ currentSlide }) => {
			if (currentSlide > 0) {
				return {
					currentSlide: currentSlide - 1,
				}
			} else {
				return {
					currentSlide: currentSlide,
				}
			}
		})
	}

	changeCurrnetImg = (e) => {
		this.setState({
			currentImg: e.target.src,
		})
	}

	createItemsSlider = () => {
		const { images, currentImg } = this.state

		return images.map((urlImg, i, arr) => {
			const styleItem = {
				height: '100%',
				width: `${100 / arr.length}%`,
			}

			return (
				<div
					className={urlImg === currentImg ? 'slider-box__img active' : 'slider-box__img'}
					style={styleItem}
					key={urlImg}
					onClick={this.changeCurrnetImg}
				>
					<img src={urlImg} alt={`slider-preview-${i + 1}`} />
				</div>
			)
		})
	}

	mouseMove = (e) => {
		const { zoom, currentImg } = this.state

		if (zoom) {
			const sizeImg = e.target.getBoundingClientRect()
			const sizeCursor = this.cursor.getBoundingClientRect()
			const x = e.clientX - sizeImg.left
			const y = e.clientY - sizeImg.top
			const zoomX = sizeImg.width / sizeCursor.width
			const zoomY = sizeImg.height / sizeCursor.height
			const coordX = (x / sizeImg.width) * 100
			const coordY = (y / sizeImg.height) * 100

			this.cursor.style.cssText = `
				top: ${y}px;
				left: ${x}px;
				background-image: url(${currentImg});
				background-position: ${coordX}% ${coordY}%;
				background-size: ${100 * 2 * zoomX}% ${100 * 2 * zoomY}%;
			`
		}
	}

	render() {
		const { currentImg, images, preview, currentSlide, zoom, animation } = this.state

		const widthBox = (100 * images.length) / preview
		const offsetItem = 100 / images.length

		const styleBox = {
			height: '100%',
			width: `${widthBox}%`,
			transform: `translateX(${-offsetItem * currentSlide}%)`,
		}

		const styleZoom = {
			backgroundImage: `url(${currentImg})`,
			backgroundSize: '100% 100%',
			backgroundPosition: 'center',
		}

		const cursorZooming = zoom ? (
			<div ref={(node) => (this.cursor = node)} className="zoom-img-cursor"></div>
		) : null

		const sliderItems = this.createItemsSlider()

		return !this.validateOptions() ? (
			<div className="warning">
				<h2 className="warning-message">{this.messageWarning}</h2>
			</div>
		) : (
			<CSSTransition in={animation} appear timeout={1500} classNames="zooming-main">
				<div className="main">
					<div className="main-wrapper">
						<div className="zoom">
							<CSSTransition in={animation} appear timeout={2500} classNames="zooming-img">
								<div
									className={zoom ? 'zoom-img zooming-cursor' : 'zoom-img'}
									style={styleZoom}
									onMouseMove={this.mouseMove}
								>
									{cursorZooming}
								</div>
							</CSSTransition>
						</div>
						<CSSTransition in={animation} appear timeout={2500} classNames="zooming-slider">
							<div className="slider">
								<div className="slider-box" style={styleBox}>
									{sliderItems}
								</div>
								<div className="slider-arrow slider-arrow__prev" onClick={this.prevSlide}>
									<div></div>
								</div>
								<div className="slider-arrow slider-arrow__next" onClick={this.nextSlide}>
									<div></div>
								</div>
							</div>
						</CSSTransition>
					</div>
				</div>
			</CSSTransition>
		)
	}
}

export default SliderZoom
