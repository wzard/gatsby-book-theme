const slugify = require(`../utils/slugify.js`);
const { SOLO_PAGE, TOPIC_PAGE, CHAPTER_PAGE } = require(`../utils/constants`);

module.exports = ({ createResolvers, schema }) => {
	createResolvers({
		Question: {
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.bookSlug);

					const bookPath = indexBooks > 1 ? `${book.slug}/` : book.index === true ? '/' : `${book.slug}/`;
					const path = `/${bookPath}questions/${source.chapterNumber}/${source.topicNumber}/${slugify(
						source.title
					)}/`;
					return path;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			},
			chapter: {
				type: `Chapter`,
				resolve(source, args, context, info) {
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find(
							(chapter) => chapter.number === source.chapterNumber && chapter.bookSlug === source.bookSlug
						);
					return chapter;
				}
			},
			topic: {
				type: `Topic`,
				resolve(source, args, context, info) {
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find(
							(chapter) =>
								parseInt(chapter.number) === parseInt(source.chapterNumber) &&
								chapter.bookSlug === source.bookSlug
						);
					const topic = context.nodeModel.getAllNodes({ type: 'Topic' }).find((topic) => {
						return (
							topic.bookSlug === chapter.bookSlug &&
							parseInt(topic.number) === parseInt(source.topicNumber)
						);
					});

					return topic;
				}
			},
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			}
		},
		Chapter: {
			questions: {
				type: `[Question]`,
				resolve(source, args, context, info) {
					const questions = context.nodeModel
						.getAllNodes({ type: `Question` })
						.filter(
							(question) =>
								question.chapterNumber === source.number && question.bookSlug === source.bookSlug
						)
						.sort((a, b) => a.number - b.number);
					return questions;
				}
			},
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			},
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.bookSlug);

					const bookPath = indexBooks > 1 ? `${book.slug}/` : book.index === true ? '/' : `${book.slug}/`;
					const path = `/${bookPath}${source.slug}/`;
					return path;
				}
			},
			topics: {
				type: `[Topic]`,
				resolve(source, args, context, info) {
					const topics = context.nodeModel
						.getAllNodes({ type: `Topic` })
						.filter((topic) => topic.chapterNumber === source.number && topic.bookSlug === source.bookSlug)
						.sort((a, b) => a.number - b.number);
					return topics;
				}
			},
			cards: {
				type: `[Card]`,
				resolve(source, args, context, info) {
					const cards = context.nodeModel
						.getAllNodes({ type: `Card` })
						.filter((card) => card.chapterNumber === source.number && card.bookSlug === source.bookSlug)
						.sort((a, b) => a.number - b.number);
					return cards;
				}
			}
		},

		Book: {
			questions: {
				type: `[Question]`,
				resolve(source, args, context, info) {
					const questions = context.nodeModel
						.getAllNodes({ type: `Question` })
						.filter((question) => question.bookSlug === source.slug)
						.sort((a, b) => a.number - b.number);
					return questions;
				}
			},
			getTableOfContent: {
				type: `[Content]`,
				resolve(source, args, context, info) {
					// Generate Path Name
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;

					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.slug);

					const bookPath = indexBooks > 1 ? `${source.slug}/` : book.index === true ? '/' : `${source.slug}/`;

					const path = `/${bookPath}${source.slug}/`;

					const topPages = context.nodeModel
						.getAllNodes({ type: 'SoloPage' })
						.filter((page) => page.bookSlug === source.slug)
						.filter((page) => page.top === true)
						.sort((a, b) => a.serial - b.serial)
						.map((page) => {
							let path = `/${bookPath}${page.slug}/`;
							return { id: page.id, title: page.title, type: SOLO_PAGE, path: path };
						});

					const chapters = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.filter((chapter) => chapter.bookSlug === source.slug)
						.sort((a, b) => a.number - b.number)
						.map((chapter) => {
							let path = `/${bookPath}${chapter.slug}/`;
							const chapterNode = {
								id: chapter.id,
								title: chapter.title,
								type: CHAPTER_PAGE,
								path: path
							};
							const topics = context.nodeModel
								.getAllNodes({ type: `Topic` })
								.filter(
									(topic) =>
										topic.chapterNumber === chapter.number && topic.bookSlug === chapter.bookSlug
								)
								.sort((a, b) => a.number - b.number);

							const topicNode = topics.map((topic) => {
								let path1 = `/${bookPath}${chapter.slug}/${topic.slug}/`;
								return {
									id: topic.id,
									title: topic.title,
									type: TOPIC_PAGE,
									path: path1
								};
							});

							return [ chapterNode, ...topicNode ];
						});
					const flattenedChapters = chapters.flat();

					const bottomPages = context.nodeModel
						.getAllNodes({ type: 'SoloPage' })
						.filter((page) => page.bookSlug === source.slug)
						.filter((page) => page.top === false)
						.sort((a, b) => a.serial - b.serial)
						.map((page) => {
							let path = `/${bookPath}${page.slug}/`;
							return { id: page.id, title: page.title, type: SOLO_PAGE, path: path };
						});

					const nodes = [ ...topPages, ...flattenedChapters, ...bottomPages ];
					return nodes;
				}
			},
			chapters: {
				type: `[Chapter]`,
				resolve(source, args, context, infor) {
					const chapters = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.filter((chapter) => chapter.bookSlug === source.slug)
						.sort((a, b) => a.number - b.number);
					return chapters;
				}
			},
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const path = indexBooks > 1 ? `/${source.slug}/` : source.index === true ? '/' : `/${source.slug}/`;
					return path;
				}
			},
			cards: {
				type: `[Card]`,
				resolve(source, args, context, info) {
					const cards = context.nodeModel
						.getAllNodes({ type: `Card` })
						.filter((card) => card.bookSlug === source.slug);
					return cards;
				}
			},
			pages: {
				type: `[SoloPage]`,
				resolve(source, args, context, info) {
					const pages = context.nodeModel
						.getAllNodes({ type: `SoloPage` })
						.filter((page) => page.bookSlug === source.slug)
						.sort((a, b) => a.number - b.number);
					return pages;
				}
			}
		},
		Topic: {
			questions: {
				type: `[Question]`,
				resolve(source, args, context, info) {
					const questions = context.nodeModel
						.getAllNodes({ type: `Question` })
						.filter(
							(question) =>
								question.bookSlug === source.bookSlug &&
								parseInt(question.topicNumber) === parseInt(source.number)
						)
						.sort((a, b) => a.number - b.number);
					return questions;
				}
			},
			chapter: {
				type: `Chapter`,
				resolve(source, args, context, info) {
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find(
							(chapter) => chapter.number === source.chapterNumber && chapter.bookSlug === source.bookSlug
						);
					return chapter;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			},
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.bookSlug);
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find(
							(chapter) => chapter.number === source.chapterNumber && chapter.bookSlug === source.bookSlug
						);
					const bookPath = indexBooks > 1 ? `${book.slug}/` : book.index === true ? '/' : `${book.slug}/`;
					const path = `/${bookPath}${chapter.slug}/${source.slug}/`;
					return path;
				}
			},
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},
			excerpt: {
				type: 'String!',
				resolve: async (source, args, context, info) => {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['excerpt'].resolve;
					const excerpt = await resolver(mdxNode, { pruneLength: 140 }, context, {
						fieldName: 'excerpt'
					});

					return excerpt;
				}
			}
		},
		SoloPage: {
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},

			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			},
			path: {
				type: `String`,
				resolve(source, args, context, info) {
					const indexBooks = context.nodeModel
						.getAllNodes({ type: `Book` })
						.filter((book) => book.index === true).length;
					const book = context.nodeModel
						.getAllNodes({ type: `Book` })
						.find((book) => book.slug === source.bookSlug);
					const bookPath = indexBooks > 1 ? `${book.slug}/` : book.index === true ? '/' : `${book.slug}/`;
					const path = `/${bookPath}${source.slug}/`;
					return path;
				}
			}
		},
		Card: {
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},
			chapter: {
				type: `Chapter`,
				resolve(source, args, context, info) {
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find((chapter) => chapter.number === source.chapterNumber);
					return chapter;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					return resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
				}
			}
		},
		Modal: {
			book: {
				type: `Book`,
				resolve(source, args, context, info) {
					const book = context.nodeModel
						.getAllNodes({ type: 'Book' })
						.find((book) => book.slug === source.bookSlug);
					return book;
				}
			},
			chapter: {
				type: `Chapter`,
				resolve(source, args, context, info) {
					const chapter = context.nodeModel
						.getAllNodes({ type: 'Chapter' })
						.find((chapter) => chapter.number === source.chapterNumber);
					return chapter;
				}
			},
			body: {
				type: 'String!',
				resolve(source, args, context, info) {
					const type = info.schema.getType(`Mdx`);
					const mdxNode = context.nodeModel.getNodeById({
						id: source.parent
					});
					const resolver = type.getFields()['body'].resolve;
					const result = resolver(mdxNode, {}, context, {
						fieldName: 'body'
					});
					return result;
				}
			}
		}
	});
};
