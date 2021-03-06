import React from 'react';
import { graphql } from 'gatsby';
import TopicLayout from '../components/TopicLayout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Content } from '../styles/styles';
import SEO from '../components/seo';

const ChapterPage = ({ data }) => {
	const tableOfContent = data.chapter.book.getTableOfContent;
	const currentIndex = tableOfContent.findIndex((node) => node.id === data.chapter.id);
	const nextIndex =
		currentIndex !== -1
			? currentIndex + 1 < tableOfContent.length ? data.chapter.book.getTableOfContent[currentIndex + 1] : null
			: null;
	const prevIndex = currentIndex !== 0 ? data.chapter.book.getTableOfContent[currentIndex - 1] : null;
	return (
		<TopicLayout
			topics={data.chapter.topics}
			chapterPath={data.chapter.path}
			chapterNumber={data.chapter.number}
			chapterTitle={data.chapter.title}
			bookPath={data.chapter.book.path}
			colNumber={data.chapter.colNumber}
			next={nextIndex}
			prev={prevIndex}
		>
			<SEO title={data.chapter.title} />
			<Content>
				<h1>{data.chapter.title}</h1>
				<MDXRenderer>{data.chapter.body}</MDXRenderer>
			</Content>
		</TopicLayout>
	);
};

export default ChapterPage;

export const pageQuery = graphql`
	query ChapterPageQuery($id: String) {
		chapter(id: { eq: $id }) {
			id
			title
			slug
			number
			body
			path
			colNumber
			topics {
				id
				title
				path
			}
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
