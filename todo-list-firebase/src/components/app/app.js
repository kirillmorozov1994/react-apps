import React from 'react'
import Navbar from '../navbar'
import { HomePage, AboutPage, NotFount } from '../pages/'
import { Route } from 'react-router-dom'

const App = () => {
	return (
		<div>
			<Navbar />
			<div className="container-lg wrapper">
				<HomePage path="/" timeout={500} classAnimation="home" />
				<AboutPage path="/about" timeout={500} classAnimation="about" />
				<Route
					path="/:notFound?"
					render={({ match }) => {
						if (match.url !== '/' && match.url !== '/about')
							return <NotFount />
					}}
				/>
			</div>
		</div>
	)
}

export default App
