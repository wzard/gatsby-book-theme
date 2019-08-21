const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-front-page-jsx": hot(preferDefault(require("/home/primer/Primer/Gatsby/ProductionTheme/primer-book-theme/src/templates/frontPage.jsx"))),
  "component---src-templates-chapter-page-jsx": hot(preferDefault(require("/home/primer/Primer/Gatsby/ProductionTheme/primer-book-theme/src/templates/chapterPage.jsx"))),
  "component---src-templates-topic-page-jsx": hot(preferDefault(require("/home/primer/Primer/Gatsby/ProductionTheme/primer-book-theme/src/templates/topicPage.jsx"))),
  "component---src-templates-solo-page-jsx": hot(preferDefault(require("/home/primer/Primer/Gatsby/ProductionTheme/primer-book-theme/src/templates/soloPage.jsx"))),
  "component---src-templates-question-page-jsx": hot(preferDefault(require("/home/primer/Primer/Gatsby/ProductionTheme/primer-book-theme/src/templates/questionPage.jsx"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/primer/Primer/Gatsby/ProductionTheme/primer-book-theme/.cache/dev-404-page.js"))),
  "component---src-pages-index-mdx": hot(preferDefault(require("/home/primer/Primer/Gatsby/ProductionTheme/primer-book-theme/src/pages/index.mdx")))
}

