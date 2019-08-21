const {
	PAGE,
	SOLO_PAGE,
	TOPIC_PAGE,
	CHAPTER_PAGE,
	CARD_PAGE,
	MODAL_PAGE,
	QUESTION_PAGE,
	PAGE_ARRAY
} = require(`./constants`);

module.exports = (node, bookSlugs) => {
	const pathArray = node.relativePath.split('/').filter((elem) => elem !== '');

	// Identify the Type of Page

	/*
			Types
				1. Chapter
					relPath: ["book-slug/chapter-{1}/index.mdx"]
				2. Topic
					relPath: ["book-slug"/chapter-{1}/topic-{1}.mdx]
				3. Solo Page
					relPath: ["book-slug"/abx.mdx]
				4. Cards
					relPath: [book-slug/chapter-1/cards/card1.mdx]
				5. Modal
					relPath: [book-slug/chapter-1/modals/modal1.mdx]
				6. Question
					relPath: [book-slug/chapter-1/questions/question1.mdx]
		
		*/

	if (bookSlugs.includes(pathArray[0])) {
		if (pathArray.length === 2) {
			if (pathArray[1].match(/^(\d+)-(.+)(.mdx?)$/) !== null) {
				return {
					type: SOLO_PAGE,
					book: pathArray[0],
					serial: pathArray[1].match(/^(\d+)-(.+)(.mdx?)$/)[1]
				};
			}
			// Check if its a Solo Page
			return {
				type: PAGE
			};
		} else if (pathArray.length === 3) {
			// Check if its a Chapter Index Page
			if (pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null && pathArray[2] === 'index.mdx') {
				return {
					type: CHAPTER_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1]
				};
			} else if (
				pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null &&
				pathArray[2].match(/^topic-(\d+)(.+)?(.mdx?)$/) !== null
			) {
				// Check if its a Topic Page
				return {
					type: TOPIC_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1],
					topicNumber: pathArray[2].match(/^topic-(\d+)(.+)?(.mdx?)$/)[1]
				};
			} else {
				return { type: PAGE };
			}
		} else if (pathArray.length === 4) {
			// Check if its a Card Page
			if (
				pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null &&
				pathArray[2] === 'cards' &&
				pathArray[3].match(/^card(\d+)(.+)?(.mdx?)$/) !== null
			) {
				return {
					type: CARD_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1],
					cardNumber: pathArray[3].match(/^card(\d+)(.+)?(.mdx?)$/)[1]
				};
			} else if (
				pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null &&
				pathArray[2] === 'modals' &&
				pathArray[3].match(/^card(\d+)(.+)?(.mdx?)$/) !== null
			) {
				return {
					type: MODAL_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1],
					modalNumber: pathArray[3].match(/^card(\d+)(.+)?(.mdx?)$/)[1]
				};
			} else if (
				pathArray[1].match(/^chapter-(\d+)(-.+)?$/) !== null &&
				pathArray[2] === 'questions' &&
				pathArray[3].match(/^question(\d+)(.+)?(.mdx?)$/) !== null
			) {
				return {
					type: QUESTION_PAGE,
					book: pathArray[0],
					chapterNumber: pathArray[1].match(/^chapter-(\d+)(-.+)?$/)[1],
					questionNumber: pathArray[3].match(/^question(\d+)(.+)?(.mdx?)$/)[1]
				};
			} else {
				return { type: PAGE };
			}
		} else {
			return {
				type: 'Page'
			};
		}
	} else {
		return {
			type: 'Page'
		};
	}
};
