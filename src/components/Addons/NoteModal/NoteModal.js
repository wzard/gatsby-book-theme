/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useContext, useRef } from 'react';
import styled from '@emotion/styled';
import { ModalContext } from '../../Modal/Modal';

// float: ${(props) => (props.float === 'left' ? 'left' : 'right')};
const Container = styled(`div`)`
	a {
		color: ${(props) => `${props.backgroundColor}!important`};
		:visited, :hover, :link: {
			color: ${(props) => `${props.backgroundColor}!important`};
		}
	}
  padding-bottom: 1rem;
 
  transition: all 0.5s;
  position: relative;
  display: block;
  padding: 1.75rem 2rem;
  :hover {
    transform: ${(props) => (props.modal ? 'scale(1.03)' : 'scale(1)')};
    box-shadow: transform: ${(props) =>
		props.modal ? '0 5px 10px 0 rgba(0, 0, 0, 0.2)' : '0 5px 10px 0 rgba(0, 0, 0, 0.2)'}; 
  }
`;

const SideNote = styled(`div`)`
  padding: 1.75rem 2rem;
  cursor: ${(props) => (props.modal ? 'pointer' : 'normal')};
  transition: all 0.5s;
  position: relative;
  display: block;

  :hover {
    transform: ${(props) => (props.modal ? 'scale(1.03)' : 'scale(1)')};
    box-shadow:   transform: ${(props) =>
		props.modal ? '0 5px 10px 0 rgba(0, 0, 0, 0.2)' : '0 5px 10px 0 rgba(0, 0, 0, 0.2)'}; 
  }

  h3 {
    font-size: 1.75rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.4;
    margin: 0;
  }
`;

const FullNote = styled(SideNote)`
  float: none;
  margin: 0;
  margin-top: 1rem;
`;

const Cards = styled(SideNote)`
  margin: 1rem auto;
  float: none;
  text-align: center;
  font-size: 4rem;
`;

export const Side = ({ children, subtitle = '', float = 'right', modal = false, large = false }) => {
	const { showModal } = useContext(ModalContext);
	const { colorMode, theme } = useThemeUI();
	const backgroundColor =
		colorMode === 'light' ? theme['colors']['background'] : theme['colors']['modes']['dark']['background'];
	const textColor = colorMode === 'light' ? theme['colors']['primary'] : theme['colors']['modes']['dark']['primary'];
	const originRef = useRef(null);
	const Box = SideNote;
	return (
		<Container
			modal={modal}
			textColor={textColor}
			backgroundColor={backgroundColor}
			sx={{
				width: [ 'auto', 'auto', 'auto', '50%' ],
				float: float === 'left' ? [ 'none', 'none', 'left' ] : [ 'none', 'none', 'right' ],
				margin:
					float === 'left'
						? [ '0.5rem', '0.5rem', '0.5rem 3rem 2rem 0' ]
						: [ '0.5rem', '0.5rem', '0.5rem 0 2rem 3rem' ]
			}}
			float={float}
		>
			<Box
				modal={modal}
				ref={originRef}
				sx={{
					backgroundColor: 'modal',
					color: 'modalText',
					fontSize: large ? '3rem' : 'inherit'
				}}
				onClick={() => {
					if (modal) {
						showModal({
							Component: modal,
							props: {
								sourceRef: originRef.current,
								background: textColor,
								textColor: backgroundColor
							},
							note: true
						});
					}
				}}
			>
				{children}
			</Box>
			<p style={{ textAlign: 'center', fontVariant: 'all-small-caps', letterSpacing: '1px' }}>{subtitle}</p>
		</Container>
	);
};

export const Full = ({ children, subtitle = '', modal = false, large = false }) => {
	const { showModal } = useContext(ModalContext);
	const { colorMode, theme } = useThemeUI();
	const backgroundColor =
		colorMode === 'light' ? theme['colors']['background'] : theme['colors']['modes']['dark']['background'];
	const textColor = colorMode === 'light' ? theme['colors']['primary'] : theme['colors']['modes']['dark']['primary'];
	const originRef = useRef(null);
	const Box = FullNote;
	return (
		<div>
			<Box
				modal={modal}
				ref={originRef}
				sx={{
					backgroundColor: 'modal',
					color: 'modalText',
					fontSize: large ? '3rem' : 'inherit'
				}}
				onClick={() => {
					if (modal) {
						showModal({
							Component: modal,
							props: {
								sourceRef: originRef.current,
								background: textColor,
								textColor: backgroundColor
							},
							note: true
						});
					}
				}}
			>
				{children}
			</Box>
			<p style={{ textAlign: 'center', fontVariant: 'all-small-caps', letterSpacing: '1px' }}>{subtitle}</p>
		</div>
	);
};

const StyledButton = styled.button`text-align: center;`;

export const FlashCard = ({ question, description }) => (
	<div style={{ width: '100%', textAlign: 'center' }}>
		<h1 sx={{ fontFamily: 'title', fontSize: 4, textAlign: 'center' }}>{question}</h1>

		<p sx={{ fontSize: 3, marginTop: 6, textAlign: 'center', fontFamily: 'subtitle' }}>{description}</p>

		<StyledButton>Show Answer/Hide Answer</StyledButton>
		<StyledButton>Next</StyledButton>
	</div>
);

export const FlashCards = ({ subtitle = '', modal = false, label = 'Test you understanding' }) => {
	const { showModal } = useContext(ModalContext);
	const { colorMode, theme } = useThemeUI();
	const backgroundColor =
		colorMode === 'light' ? theme['colors']['background'] : theme['colors']['modes']['dark']['background'];
	const textColor = colorMode === 'light' ? theme['colors']['primary'] : theme['colors']['modes']['dark']['primary'];
	const originRef = useRef(null);
	const Box = Cards;
	return (
		<div>
			<Box
				modal={modal}
				ref={originRef}
				sx={{
					backgroundColor: textColor,
					color: backgroundColor,
					fontSize: '2rem',
					fontFamily: 'subtitle',
					fontVariant: 'all-small-caps',
					letterSpacing: '1px'
				}}
				onClick={() => {
					if (modal) {
						showModal({
							Component: modal,
							props: {
								sourceRef: originRef.current,
								background: textColor,
								textColor: backgroundColor
							},
							note: true
						});
					}
				}}
			>
				{label}
			</Box>
			<p style={{ textAlign: 'center', fontVariant: 'all-small-caps', letterSpacing: '1px' }}>{subtitle}</p>
		</div>
	);
};
