import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../header/header'
import GlobalStyle from './globalStyle'
import Helmet from 'react-helmet'

const Layout = ({ children }) => (
	<StaticQuery
		query={graphql`
			query SiteTitleQuery {
				site {
					siteMetadata {
						title
					}
				}
			}
		`}
		render={data => (
			<>
				<Helmet>
					<link
						href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700&display=swap"
						rel="stylesheet"
					/>
				</Helmet>
				<GlobalStyle />
				<Header siteTitle={data.site.siteMetadata.title} />
				<div
					style={{
						margin: '0 auto',
						maxWidth: 960,
						padding: '0px 1.0875rem 1.45rem',
						paddingTop: 0,
					}}
				>
					{children}
				</div>
			</>
		)}
	/>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
