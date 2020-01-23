import React from 'react'
import * as Scroll from 'react-scroll'

export default class Sroller extends React.Component {
	render() {
		const { children, scrollTo = '#' } = this.props

		return (
			<button
				style={{
					background: 'none',
					border: 'none',
					color: 'red',
				}}
				onClick={() => {
					console.log(scrollTo)
					Scroll.scroller.scrollTo(scrollTo, {
						duration: 300,
						delay: 0,
						smooth: true,
						offset: -50, // Scrolls to element + 50 pixels down the page
					})
				}}
			>
				{children}
			</button>
		)
	}
}
