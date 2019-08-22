export const theme = {
	breakpoints: [ '575px', '767px', '991px', '1199px' ],
	space: [ 0, 4, 8, 16, 20, 32, 60, 100, 200 ],
	fonts: {
		body: 'Bitter, serif;',
		title: 'Bitter, sans-serif;',
		subtitle: 'Bitter, sans-serif;',
		heading: 'Bitter, serif'
	},
	radii: [ 5 ],
	fontSizes: [ 16, 18, 20, 24, 26, 30, 36 ],
	lineHeights: {
		body: 1.45,
		heading: 1.1
	},
	fontWeights: {
		light: 100,
		body: 400,
		heading: 700,
		bold: 700
	},
	initialColorMode: 'light',
	colors: {
		text: '#333',
		background: '#FCF7F8',
		primary: '#333',
		modal: '#333',
		modalText: '#FCF7F8',
		modes: {
			dark: {
				text: '#659B5E',
				background: '#1E2019',
				primary: '#659B5E',
				modal: '#659B5E',
				modalText: '#1E2019'
			}
		}
	},
	sizes: {
		default: '90vw',
		max: '1020px'
	},
	styles: {
		Layout: {
			color: 'primary',
			fontFamily: 'Bitter',
			fontSize: 2,
			lineHeight: 'body',
			a: {
				color: 'primary',
				'&:visited, &:hover, &:link': {
					color: 'primary'
				}
			},

			p: {
				fontSize: 1,
				fontFamily: 'Bitter'
			},
			h1: {
				fontFamily: 'Bitter'
			},
			h2: {
				fontFamily: 'Bitter'
			},
			h3: {
				fontFamily: 'Bitter'
			},
			h4: {
				fontFamily: 'Bitter'
			},
			h5: {
				fontFamily: 'Bitter'
			},
			h6: {
				fontFamily: 'Bitter'
			},
			svg: {
				fill: 'background'
			}
		},
		Header: {
			backgroundColor: 'primary',
			color: 'background',
			fontWeight: 'bold',
			margin: '0 auto',
			maxWidth: 'max',
			padding: 3,
			width: 'default',
			a: {
				color: 'inherit'
			}
		},
		Main: {
			display: 'flex',
			flexDirection: [ 'column', 'column', 'column', 'row' ],
			maxWidth: 'unset'
		}
	}
};

export default theme;
