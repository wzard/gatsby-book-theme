const slugify = require(`../utils/slugify.js`);
const defaultOptions = require(`../utils/default-options.js`);

module.exports = async ({ actions, graphql, reporter }, options) => {
	options = defaultOptions;

	const indice = options.books.filter((book) => book.index === true).length;

	if (indice > 1) {
		reporter.info(`Multiple Index Books Defined !`);
		reporter.info(`Creating books at their own slugs`);
		// Creating books at their own slugs
		options.books.forEach((book) => {
			actions.createPage({
				path: slugify(book.name),
				component: require.resolve('../src/templates/frontPage.jsx'),
				context: { slug: slugify(book.name) }
			});
		});
	} else {
		options.books.forEach((book) => {
			// Creating an Index Book and other books at their respective slug
			actions.createPage({
				path: book.index ? '/' : slugify(book.name),
				component: require.resolve('../src/templates/frontPage.jsx'),
				context: { slug: slugify(book.name) }
			});
		});
	}

	// Query for All books content

	const result = await graphql(`
		query {
			allBook {
				edges {
				  node {
					  id
					  slug
					  name
					  index
						pages {
						id
						title
						slug
						path
						}
					questions {
						id
						title
						path
					}
					chapters {
					  id
					  title
					  slug
					  topics {
						id
						title
						slug
					  }
					}
				  }
				}
			  }
		}`);

	if (result.errors) {
		reporter.panic('error loading events', reporter.errors);
		return;
	}

	const books = result.data.allBook.edges;

	books.forEach((book) => {
		const bookSlug = indice > 1 ? `${book.node.slug}/` : book.node.index ? '/' : `${book.node.slug}/`;
		// Create Chapter Page
		book.node.chapters.forEach((chapter) => {
			actions.createPage({
				path: `${bookSlug}${chapter.slug}`,
				component: require.resolve('../src/templates/chapterPage.jsx'),
				context: { id: chapter.id }
			});
			chapter.topics.forEach((topic) => {
				actions.createPage({
					path: `${bookSlug}${chapter.slug}/${topic.slug}`,
					component: require.resolve('../src/templates/topicPage.jsx'),
					context: { id: topic.id }
				});
			});
		});

		// Create Solo Page
		book.node.pages.forEach((page) => {
			actions.createPage({
				path: `${page.path}`,
				component: require.resolve('../src/templates/soloPage.jsx'),
				context: { id: page.id }
			});
		});

		// Create Questions Page
		book.node.questions.forEach((question) => {
			actions.createPage({
				path: `${question.path}`,
				component: require.resolve('../src/templates/questionPage.jsx'),
				context: { id: question.id }
			});
		});
	});
};
