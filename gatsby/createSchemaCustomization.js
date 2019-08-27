module.exports = ({ actions }) => {
	const { createTypes } = actions;
	const typeDefs = `


	type Book implements Node {
		id: ID!
		name: String
		slug: String
		path: String
		index: Boolean
		chapters: [Chapter] 
		pages: [SoloPage]
		cards: [Card]
		getTableOfContent: [Content]
		questions: [Question]
	}

	type SoloPage implements Node {
		id: ID!
		title: String!
		slug: String
		path: String
		top: Boolean
		bookSlug: String
		serial: Int
		book: Book
		body: String!
	}

	type Chapter implements Node  {
		id: ID!
		title: String!
		slug: String!
		path: String
		bookSlug: String
		topics: [Topic]
		number: Int
		book: Book 
		cards: [Card]
		modals: [Modal]
		body: String!
		questions: [Question]
		colNumber: Int
	}

	type Topic implements Node  {
		id: ID!
		title: String!
		slug: String
		path: String
		number: Int
		chapterNumber: Int
		chapter: Chapter
		book: Book
		body: String!
		questions: [Question]
		colNumber: Int
	}

	type Card implements Node {
		id: ID!
		number: Int
		bookSlug: String
		chapterNumber: Int
		chapter: Chapter
		body: String!
	}

	type Modal implements Node {
		id: ID!
		number: Int
		bookSlug: String
		chapterNumber: Int
		chapter: Chapter
		body: String!
	}

	type Question implements Node {
		id: ID!
		bookSlug: String
		chapterNumber: Int
		number: Int
		topicNumber: Int
		body: String
		title: String
		path: String
		chapter: Chapter
		topic: Topic
		book: Book
	}
   
	type Mdx implements Node @infer {
	  frontmatter: MdxFrontmatter
	}

	type Content implements Node {
		title: String
		path: String
		id: ID!
		type: String
	}

	`;
	createTypes(typeDefs);
};

// type MdxFrontmatter @infer {
// 	author: String
// 	top: Boolean
// 	slug: String
// 	colNumber: Int
// }
