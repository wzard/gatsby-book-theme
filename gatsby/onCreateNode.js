const slugify = require(`../utils/slugify.js`);
const defaultOptions = require(`../utils/default-options.js`);
const getPageDetail = require(`../utils/getPageDetail.js`);
const {
	PAGE,
	SOLO_PAGE,
	TOPIC_PAGE,
	CHAPTER_PAGE,
	CARD_PAGE,
	MODAL_PAGE,
	QUESTION_PAGE,
	PAGE_ARRAY
} = require(`../utils/constants`);
const get = require('lodash.get');

module.exports = ({ node, actions, getNode, reporter, createNodeId, createContentDigest }, options) => {
	options = defaultOptions;
	const { createNodeField, createNode, createParentChildLink } = actions;
	const fileNode = getNode(node.parent);
	const books = options.books.map((book) => ({ ...book, slug: slugify(book.name) }));
	const bookSlugs = books.map((book) => book.slug);
	if (get(node, 'internal.type') === `Mdx` && fileNode.sourceInstanceName === 'books') {
		const details = getPageDetail(fileNode, bookSlugs);
		if (PAGE_ARRAY.includes(details.type)) {
			createNodeField({
				node,
				name: 'book',
				value: books.find((elem) => elem.slug === details.book)
			});
			createNodeField({
				node,
				name: 'type',
				value: details.type
			});
			if (details.type === CHAPTER_PAGE) {
				//
				// CREATE CHAPTER PAGE NODE
				//

				const { frontmatter } = node;
				const parent = getNode(node.parent);

				const fieldData = {
					title: frontmatter.title,
					slug: frontmatter.slug ? frontmatter.slug : slugify(frontmatter.title),
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					// topics:
					number: details.chapterNumber,
					colNumber: frontmatter.colNumber || 2
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Chapter`),
					parent: node.id,
					children: [],
					internal: {
						type: `Chapter`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Chapter Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
			} else if (details.type === TOPIC_PAGE) {
				//
				// CREATE TOPIC PAGE NODE
				//

				const { frontmatter } = node;
				const parent = getNode(node.parent);

				const fieldData = {
					title: frontmatter.title,
					slug: frontmatter.slug ? frontmatter.slug : slugify(frontmatter.title),
					number: details.topicNumber,
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					chapterNumber: details.chapterNumber,
					colNumber: frontmatter.colNumber || 2
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Topic`),
					parent: node.id,
					children: [],
					internal: {
						type: `Topic`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Topic Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
			} else if (details.type === MODAL_PAGE) {
				//
				// CREATE MODAL PAGE NODE
				//

				const parent = getNode(node.parent);

				const fieldData = {
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					chapterNumber: details.chapterNumber,
					number: details.modalNumber
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Modal`),
					parent: node.id,
					children: [],
					internal: {
						type: `Modal`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Modal Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
			} else if (details.type === QUESTION_PAGE) {
				//
				// CREATE QUESTION PAGE NODE
				//
				const { frontmatter } = node;
				const parent = getNode(node.parent);
				const fieldData = {
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					chapterNumber: details.chapterNumber,
					number: details.questionNumber,
					title: frontmatter.title,
					topicNumber: frontmatter.topicNumber || 1
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Question`),
					parent: node.id,
					children: [],
					internal: {
						type: `Question`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Question Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
			} else if (details.type === CARD_PAGE) {
				//
				// CREATE CARD PAGE NODE
				//

				const parent = getNode(node.parent);

				const fieldData = {
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					chapterNumber: details.chapterNumber,
					number: details.cardNumber
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Card`),
					parent: node.id,
					children: [],
					internal: {
						type: `Card`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Card Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
			} else if (details.type === SOLO_PAGE) {
				//
				// CREATE SOLO PAGE NODE
				//

				const { frontmatter } = node;
				const parent = getNode(node.parent);

				const fieldData = {
					title: frontmatter.title,
					slug: frontmatter.slug ? frontmatter.slug : slugify(frontmatter.title),
					bookSlug: books.find((elem) => elem.slug === details.book).slug,
					top: frontmatter.top === true ? true : false,
					serial: details.serial
				};

				createNode({
					...fieldData,
					// Required fields.
					id: createNodeId(`${node.id} >>> Solo`),
					parent: node.id,
					children: [],
					internal: {
						type: `SoloPage`,
						contentDigest: createContentDigest(fieldData),
						content: JSON.stringify(fieldData),
						description: `Solo Page`
					}
				});

				createParentChildLink({ parent: parent, child: node });
			}
		}
	}
};
