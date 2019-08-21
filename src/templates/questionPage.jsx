import React from 'react';
import { graphql } from 'gatsby';
import QuestionLayout from '../components/QuestionLayout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Content } from '../styles/styles';

const QuestionPage = ({ data }) => {
	return (
		<QuestionLayout
			solo
			next={null}
			prev={null}
			chapterTitle={data.question.chapter.title}
			bookPath={data.question.book.path}
		>
			<Content>
				<MDXRenderer>{data.question.body}</MDXRenderer>
			</Content>
		</QuestionLayout>
	);
};

export default QuestionPage;

export const pageQuery = graphql`
	query QuestionPageQuery($id: String) {
		question(id: { eq: $id }) {
			id
			title
			body
			path
			chapter {
				id
				title
			}
			book {
				id
				path
			}
		}
	}
`;
