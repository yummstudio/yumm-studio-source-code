import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'
import styled from 'styled-components'
import theme from '../../theme/variables'

const TagFilter = styled.div`
	margin: 32px 0px;
	span {
		display: inline-block;
		margin-right: 16px;
		padding: 8px 12px;
		background-color: ${theme.colorBlack};
		color: white;
		margin-bottom: 16px;
	}
`
const PostGridItem = styled.li`
	list-style: none;
	margin: 0px;
	margin-top: 16px;
	a {
		font-weight: 400;
		color: ${theme.colorBlack};
		font-size: 1.8em;
		text-decoration: none;
		padding: 22px 0px;
		margin: 0px 16px;
		position: relative;
		display: block;
		&:after {
			content: '';
			position: absolute;
			left: 0px;
			bottom: -2px;
			height: 4px;
			width: 40%;
			background-color: ${theme.colorBlack};
		}
	}
	.post-tags {
		font-weight: 400;
		font-size: 0.8rem;
		margin-top: 8px;
		span {
			display: inline-block;
			margin-right: 16px;
			padding: 4px 6px;
			color: ${theme.colorBlack};
			/* color: white; */
		}
	}
`
function Blog(props) {
	const { allMdx } = useStaticQuery(
		graphql`
			query {
				allMdx(
					filter: { fields: { type: { in: ["article"] } } }
				) {
					edges {
						node {
							id
							excerpt
							frontmatter {
								title
								tags
							}
							fields {
								slug
							}
						}
					}
				}
			}
		`
	)
	// Creating a Set with all different Tags

	const tagSet = new Set()
	allMdx.edges.map(({ node }) => {
		if (node.frontmatter.tags) {
			node.frontmatter.tags.forEach(tag => {
				tagSet.add(tag)
			})
		}
		return
	})
	let allTags = []
	{
		tagSet.forEach(tag => allTags.push(tag))
	}
	return (
		<>
			<TagFilter>
				{allTags.map((tag, index) => (
					<span key={index}>{tag}</span>
				))}
			</TagFilter>

			<ul style={{ margin: 0 }}>
				{allMdx.edges.map(({ node: post }) => (
					<PostGridItem key={post.id}>
						<Link to={post.fields.slug}>
							{post.frontmatter.title}

							{post.frontmatter.tags && (
								<div className="post-tags">
									{post.frontmatter.tags.map(
										tag => (
											<span key={tag}>
												#{tag}
											</span>
										)
									)}
								</div>
							)}
						</Link>
					</PostGridItem>
				))}
			</ul>
		</>
	)
}
export default Blog
