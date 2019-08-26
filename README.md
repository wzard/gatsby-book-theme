# Gatsby PrimerBook Theme

## Options

- **contentPath** The directory where the books will be stored. Defaults to `books` 	
- **books** An array of book to be created using the theme.  
E.g. 

```
books: [
		{
			name: 'Machine Learning',
			subtitle: 'Teaching Machines to think like humans',
			author: 'primerlabs',
		},
		{
			name: 'Logistic Regression',
			subtitle: 'Teaching Machines to think like humans',
			author: 'primerlabs'
		}
	]
```
- **book** Book detail to be provided to the `books` theme 
    - **name** Name of the Book *required*
    - **subtitle** Subtitle of the Book *required*
    - **author** Author of the Book *required*
    - **index** Defaults to false *required* . Use this if you wish to use the book at the root '/' of the gatsby application
- **autoGenerate** Defaults to `true`. If true, a folder for each book specified `books` option will be generated and filled with example data. 




## API

You can use the following directly in the Mdx Books Files

- **Side**
	- subtitle = ''
	- float = 'right'
	- large = false
	- modal = false

- **Full**
	- subtitle = ''
	- large = false
	- modal = false,
