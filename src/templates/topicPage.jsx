import React from 'react';
import { graphql } from 'gatsby';
import TopicLayout from '../components/TopicLayout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Content } from '../styles/styles';
import SEO from '../components/seo';
import { MDXProvider } from '@mdx-js/react';
import CodeModal from '../components/Addons/CodeModal';

const Hello = ({ children }) => <div style={{ backgroundColor: 'green' }}>{children};</div>;

const Question = ({ children }) => <MDXRenderer>{children}</MDXRenderer>;

const TopicPage = ({ data, ...props }) => {
	const tableOfContent = data.topic.book.getTableOfContent;
	const currentIndex = tableOfContent.findIndex((node) => node.id === data.topic.id);
	const nextIndex =
		currentIndex !== -1
			? currentIndex + 1 < tableOfContent.length ? data.topic.book.getTableOfContent[currentIndex + 1] : null
			: null;
	const prevIndex = currentIndex !== 0 ? data.topic.book.getTableOfContent[currentIndex - 1] : null;
	console.log(CodeModal);
	return (
		<TopicLayout
			topics={data.topic.chapter.topics}
			chapterPath={data.topic.chapter.path}
			chapterNumber={data.topic.chapter.number}
			chapterTitle={data.topic.chapter.title}
			bookPath={data.topic.book.path}
			colNumber={data.topic.chapter.colNumber}
			next={nextIndex}
			prev={prevIndex}
		>
			<SEO title={data.topic.title} />
			<Content>
				<h1>{data.topic.title}</h1>
				<MDXProvider components={{ CodeModal, Hello, Question }}>
					<MDXRenderer components={{ Hello }}>{data.topic.body}</MDXRenderer>
				</MDXProvider>
			</Content>
		</TopicLayout>
	);
};

export default TopicPage;

export const pageQuery = graphql`
	query TopicPageQuery($id: String) {
		topic(id: { eq: $id }) {
			id
			title
			slug
			number
			body
			chapter {
				id
				title
				number
				path
				colNumber
				topics {
					id
					title
					path
				}
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
