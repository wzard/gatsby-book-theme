import React from 'react';
import { graphql } from 'gatsby';
import TopicLayout from '../components/TopicLayout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Content } from '../styles/styles';

const SoloPage = ({ data }) => {
	const tableOfContent = data.soloPage.book.getTableOfContent;
	const currentIndex = tableOfContent.findIndex((node) => node.id === data.soloPage.id);
	const nextIndex =
		currentIndex !== -1
			? currentIndex + 1 < tableOfContent.length ? data.soloPage.book.getTableOfContent[currentIndex + 1] : null
			: null;
	const prevIndex = currentIndex !== 0 ? data.soloPage.book.getTableOfContent[currentIndex - 1] : null;
	return (
		<TopicLayout
			solo
			next={nextIndex}
			prev={prevIndex}
			chapterTitle={data.soloPage.title}
			bookPath={data.soloPage.book.path}
		>
			<Content>
				<MDXRenderer>{data.soloPage.body}</MDXRenderer>
			</Content>
		</TopicLayout>
	);
};

export default SoloPage;

export const pageQuery = graphql`
	query SoloPageQuery($id: String) {
		soloPage(id: { eq: $id }) {
			id
			title
			slug
			body
			path
			book {
				id
				path
				getTableOfContent {
					id
					title
					path
					type
				}
			}
		}
	}
`;
