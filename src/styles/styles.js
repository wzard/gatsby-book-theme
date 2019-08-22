/** @jsx jsx */
import { jsx } from 'theme-ui';
import styled from '@emotion/styled';
import { Link as UnStyledLink } from 'gatsby';
import { useColorMode, useThemeUI } from 'theme-ui';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Location } from '@reach/router';
import { Twitter, Facebook, Linkedin, Mail, Reddit } from 'react-social-sharing';

export const SharingButtons = () => {
	const context = useThemeUI();
	const primary =
		context.colorMode === 'light' ? context.theme.colors.primary : context.theme.colors.modes.dark.primary;

	const background =
		context.colorMode === 'light' ? context.theme.colors.background : context.theme.colors.modes.dark.background;

	const style = {
		background: primary,
		borderColor: primary,
		padding: '7px 14px'
	};
	return (
		<div
			sx={{
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<Twitter
				iconFill={primary}
				style={style}
				solid
				small
				message="I am so cool"
				link="http://sharingbuttons.io"
			/>
			<Facebook style={style} solid small link="http://sharingbuttons.io" />
			<Mail style={style} solid small link="http://sharingbuttons.io" />
			<Linkedin style={style} solid small link="http://sharingbuttons.io" />
			<Reddit style={style} solid small link="http://sharingbuttons.io" />
		</div>
	);
};

export const Content = ({ children }) => (
	<StyledContent sx={{ margin: [ '0%', '0%', '0%', `5%` ] }}>{children}</StyledContent>
);

export const ChapterNumber = ({ children }) => (
	<span
		sx={{
			fontFamily: 'body',
			fontVariant: 'all-small-caps',
			fontWeight: '100',
			fontSize: 4
		}}
	>
		{children}
	</span>
);

const StyledContent = styled(`div`)`
  .gatsby-highlight {
    max-height: 30rem;
    overflow-y: auto;
    border-radius: 0.2rem;
    margin: 3rem 0;

    pre {
      margin: 0;
      padding: 1rem 1.5rem;
    }

    /* width */
    &::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #222;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #666;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
  }
`;

export const Link = (props) => (
	<UnStyledLink style={{ textDecoration: 'none' }} {...props}>
		{props.children}
	</UnStyledLink>
);

export const SidebarLink = (props) => (
	<UnStyledLink sx={{ textDecoration: 'none!important', color: 'background', marginTop: '6' }} {...props}>
		{props.children}
	</UnStyledLink>
);

export const Section = ({ children }) => (
	<h3
		sx={{
			fontFamily: 'title',
			fontVariant: 'all-small-caps',
			textDecoration: 'none',
			fontSize: 5,
			letterSpacing: '1px'
		}}
	>
		{children}
	</h3>
);

export const TableOfContent = ({ children }) => <div sx={{ padding: '20px' }}>{children}</div>;

export const TableOfContentSectionList = ({ children, colNumber }) => (
	<ol
		sx={{
			paddingLeft: [ 1, 2, 4 ],
			columnCount: [ 1, 2, 2 ],
			fontFamily: 'title',
			listStylePosition: 'inside'
		}}
	>
		{children}
	</ol>
);

export const GlossaryList = ({ children }) => (
	<div sx={{ padding: 5, paddingTop: 0 }}>
		<h1>Glossary</h1>
		<ul>{children}</ul>
	</div>
);

export const Term = ({ name, children }) => (
	<li
		sx={{
			padding: 3
		}}
	>
		<span
			sx={{
				fontFamily: 'title',
				fontWeight: 'bolder'
			}}
		>
			{name}
		</span>{' '}
		<span
			sx={{
				fontFamily: 'subtitle',
				fontSize: 1
			}}
		>
			{children}
		</span>
	</li>
);

export const Container = (props) => (
	<div
		sx={{
			padding: 4,
			width: [ 'auto', 'auto', 'auto', '100%' ],
			marginLeft: [ '0%', '0%', '0%', `${!props.expand ? '470px' : '0px'}` ]
		}}
	>
		{props.children}
	</div>
);

export const Sidebar = (props) => (
	<div
		sx={{
			backgroundColor: 'background',
			position: [ 'unset', 'unset', 'unset', 'fixed' ],
			width: [ 'auto', 'auto', 'auto', `${!props.visible ? '0px' : '450px'}` ],
			opacity: [ '1', '1', '1', `${!props.visible ? '0' : '1'}` ],
			transform: [
				'translateX(0)',
				'translateX(0)',
				'translateX(0)',
				`${!props.visible ? 'translateX(-450px)' : 'translateX(0px)'}`
			],
			display: [ 'flex', 'flex', `${!props.visible ? 'flex' : 'flex'}` ],
			flexDirection: 'column',
			padding: 4,
			paddingTop: [ 4, 4, 6 ],
			height: '100%',
			color: 'primary',
			transition: [
				'transform 1s',
				'transform 1s',
				'transform 1s',
				`transform 1s, opacity 1s, width 0s linear ${!props.visible ? '2s' : '0s'}`
			],
			overflowY: 'auto',
			zIndex: '50'
		}}
	>
		{props.children}
	</div>
);

export const IconButton = (props) => (
	<button
		onClick={props.handleClick}
		sx={{
			backgroundColor: 'primary',
			color: 'background',
			display: [ 'none', 'none', 'flex' ],
			border: (theme) => `1px solid ${theme.colors.primary}`,
			padding: '7px',
			position: 'fixed',
			top: '20px',
			left: '20px',
			cursor: 'pointer',
			zIndex: '999'
		}}
	>
		{props.children}
	</button>
);

// const ButtonIcon = styled(`button`)`

//   top: ${(props) => (props.top ? props.top : '20px')};
//    opacity: 0.5;
//   transition: opacity 0.5s;
//   cursor: pointer;

//   svg {
//     width: 1.8rem;
//     height: 1.8rem;
//   }

//   :hover {
//     opacity: 1;

//     svg {
//       color: #ffffff;
//     }
//   }
// `;

export const MainTitle = ({ children }) => {
	return (
		<div
			sx={{
				textAlign: 'right',
				paddingTop: '30%'
			}}
		>
			{children}
		</div>
	);
};

export const TopicSidebarTitle = ({ children }) => {
	return (
		<div
			sx={{
				textAlign: 'left',
				paddingTop: '20%'
			}}
		>
			{children}
		</div>
	);
};

export const ThemeButton = (props) => {
	const [ colorMode, setColorMode ] = useColorMode();
	return (
		<header sx={{ marginTop: '6' }}>
			<div
				style={{
					display: 'flex',
					cursor: 'pointer',
					justifyContent: 'space-between',
					width: '50px',
					margin: 'auto',
					position: 'fixed',
					top: '10px',
					left: '10px'
				}}
			>
				<FiSun
					sx={{ opacity: colorMode === 'light' ? '1' : '0.5' }}
					className="ThemeIcon"
					onClick={(e) => setColorMode('light')}
				/>
				<FiMoon
					sx={{ opacity: colorMode === 'dark' ? '1' : '0.5' }}
					className="ThemeIcon"
					onClick={(e) => setColorMode('dark')}
				/>
			</div>
		</header>
	);
};

export const StyledButtonLink = ({ children, ...props }) => {
	return (
		<UnStyledLink
			sx={{
				border: '1px solid',
				borderColor: 'primary',
				padding: '10px 20px',
				backgroundColor: 'primary',
				textDecoration: 'none!important',
				color: (theme) => `${theme.colors.background}!important`,
				fontFamily: 'title',
				letterSpacing: '1px',
				textAlign: 'center',
				cursor: 'pointer',
				margin: '1rem',
				fontSize: 3,
				fontVariant: 'all-small-caps',
				fontWeight: 'bolder'
			}}
			{...props}
		>
			{children}
		</UnStyledLink>
	);
};

export const Divider = (props) => (
	<hr sx={{ display: [ 'block', 'block', 'none' ], width: '75%', border: '1px solid', color: 'text' }} />
);

export const BookTitle = (props) => (
	<h1
		sx={{
			fontFamily: 'title',
			color: 'primary',
			borderBottom: (theme) => `5px solid ${theme.colors.primary}`,
			marginBottom: '0px'
		}}
	>
		{props.children}
	</h1>
);

export const BookSubTitle = (props) => (
	<h2
		className="subtitle"
		sx={{
			fontFamily: 'subtitle',
			color: 'primary',
			fontWeight: '100',
			marginTop: 1,
			fontSize: [ 3, 4, 5 ]
		}}
	>
		{props.children}
	</h2>
);

export const BookAuthor = (props) => (
	<p
		sx={{
			fontFamily: 'title',
			letterSpacing: '1px',
			fontSize: '32px !important',
			fontVariant: 'all-small-caps',
			fontWeight: 'bold'
		}}
	>
		{props.children}
	</p>
);

export const ChapterTitle = (props) => (
	<h1
		sx={{
			fontFamily: 'title',
			color: 'primary',
			borderBottom: (theme) => `5px solid ${theme.colors.primary}`,
			marginTop: 0
		}}
	>
		{props.children}
	</h1>
);

export const SidebarTopicList = (props) => (
	<ol
		sx={{
			paddingLeft: 4,
			columnCount: [ 2, 2, `${props.columns}` ],
			fontFamily: 'body',
			listStylePosition: 'inside',
			fontVariant: 'all-small-caps',
			fontSize: 4
		}}
	>
		{props.children}
	</ol>
);

export const SidebarBottomButton = styled.div`
	display: flex;
	justify-content: space-around;
`;

export const Button = ({ children }) => (
	<button
		sx={{
			padding: 2,
			border: (theme) => `1px solid ${theme.colors.primary}`,
			color: 'background',
			backgroundColor: 'primary',
			cursor: 'pointer',
			fontFamily: 'body',
			fontSize: '2',
			borderRadius: 0,
			boxShadow: '3px 3px 5px 3px #888888'
		}}
	>
		{children}
	</button>
);

export const TopicListItem = ({ topic }) => {
	return (
		<Location>
			{({ location }) => {
				const { pathname } = location;
				const selected = pathname === topic.path;
				console.log(topic.path);
				return (
					<li
						sx={{
							cursor: 'pointer',

							fontWeight: selected ? 'bolder' : 'normal',
							opacity: selected ? '1' : '0.5'
						}}
						key={topic.id}
					>
						<Link to={topic.path}>{topic.title}</Link>
					</li>
				);
			}}
		</Location>
	);
};

// textDecoration: selected ? 'underline' : 'none',
