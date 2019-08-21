const uuid = require('uuid');
const slugify = require(`../utils/slugify.js`);
const defaultOptions = require(`../utils/default-options.js`);

module.exports = ({ actions, createNodeId, reporter, createContentDigest }, options) => {
	options = defaultOptions;
	const { createNode } = actions;
	// Create Book Nodes
	options.books.forEach((book) => {
		const bookData = {
			name: book.name,
			slug: slugify(book.name),
			index: book.index ? book.index : false,
			subtitle: book.subtitle || '',
			author: book.author || '',
			type: 'Book'
		};

		const nodeContent = JSON.stringify(bookData);
		const id = createNodeId(uuid());
		const nodeMeta = {
			id: id,
			parent: null,
			children: [],
			internal: {
				type: `Book`,
				mediaType: `text/json`,
				content: nodeContent,
				contentDigest: createContentDigest(bookData)
			}
		};

		const node = { ...bookData, ...nodeMeta };
		createNode(node);
		reporter.info(`Created Book node for ${book.name}`);
	});
};
