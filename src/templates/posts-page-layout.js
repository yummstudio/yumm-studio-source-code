import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout/layout'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import styled from 'styled-components'

const PostIntro = styled.div`
	padding-top: 60vh;
	min-height: 90vh;
	text-align: center;
	h1 {
		text-align: inherit;
		font-weight: 400;
	}
	.tags {
		margin: 0px;
		li {
			list-style: none;
			text-transform: uppercase;
			font-size: 0.8em;
			font-weight: 900;
			display: inline-block;
			margin: 8px 4px;
		}
	}
`
const PostSumUp = styled.div`
	margin: 16px;
	border-radius: 10px;
	padding: 16px;
	text-align: left;
	background: rgb(255, 12, 41);
	background: linear-gradient(
		137deg,
		rgba(255, 32, 62, 10) 0%,
		rgba(255, 93, 29, 1) 62%,
		rgba(218, 33, 33, 1) 100%
	);
	color: white;
	.intro {
		text-transform: uppercase;
		font-size: 0.8em;
		font-weight: 700;
		display: block;
		margin: 16px 0px;
	}
`
export default function PageTemplate({ data: { post } }) {
	const { id, body, frontmatter, fields, headings } = post
	const { title } = frontmatter
	const { slug } = fields

	let disqusConfig = {
		url: `${'https://yumm.studio' + slug}`,
		identifier: id,
		title: title,
	}

	return (
		<Layout>
			<PostIntro height={60}>
				<ul className="tags">
					<li>Marketing</li>
					<li>StartUp</li>
				</ul>
				<h1>{title}</h1>
				<PostSumUp>
					<span className="intro">
						What we will talk about
					</span>
					<ul>
						{headings.map((item, index) => (
							<li key={index} className="">
								{item.depth}
								{item.value}
							</li>
						))}
					</ul>
				</PostSumUp>
			</PostIntro>
			<MDXRenderer>{body}</MDXRenderer>
			<CommentCount config={disqusConfig} placeholder={'...'} />
			<Disqus config={disqusConfig} />
		</Layout>
	)
}

export const pageQuery = graphql`
	query PostsTemplateQuery($id: String) {
		post: mdx(id: { eq: $id }) {
			id
			body
			frontmatter {
				title
			}
			headings {
				depth
				value
			}
			fields {
				slug
			}
		}
	}
`
