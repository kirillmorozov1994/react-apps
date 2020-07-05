import React from 'react'
import SliderZoom from '../slider-zoom/slider-zoom'
import './app.scss'

const App = () => {
	const options = {
		images: [
			'https://poster.nicefon.ru/2016_12/05/1080x610/182164e8fcb471e9d2d9cb.jpg',
			'https://7themes.su/php/imres/resize.php?width=1024&height=600&cropratio=128:75&image=/_ph/55/806745675.jpg',
			'https://i04.fotocdn.net/s108/18ebf87b76e287b0/public_pin_l/2392515532.jpg',
			'https://99px.ru/sstorage/53/2017/03/tmb_195291_2706.jpg',
			'https://data.1freewallpapers.com/detail/beautiful-autumn-over-the-river.jpg',
			'https://yandex.ru/images/_crpd/Fvt16t335/c8200cf-ytd/exqiHqfhi03rcVnzaFsDk7RBsOg22F1cIO-e_q4vGBxpg22CXxkoGpP1Rs8KffYs30pLNxPPO2D78qqa3S14TKnaYoxmMYvdPmEdtX8aR5P21af9I4mLHuEumn7vKQ-ZJ0w2HkNCNkAM6F9EDLzjrR6YDGDAweC',
		],
		zoom: true,
		animation: true,
		preview: 3,
	}

	return (
		<div className="container">
			<div className="app">
				<SliderZoom {...options} />
			</div>
		</div>
	)
}

export default App
