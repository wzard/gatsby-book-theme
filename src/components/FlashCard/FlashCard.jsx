/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { jsx } from 'theme-ui';

const StyledButton = styled.button`
	text-align: center;
	cursor: pointer;
	margin: 1rem;
`;

export const Card = ({ question, children, show }) => {
	return (
		<div style={{ width: '100%', textAlign: 'center' }}>
			<h1 sx={{ fontFamily: 'title', fontSize: 4, textAlign: 'center' }}>{question}</h1>

			<div
				sx={{
					fontSize: 3,
					marginTop: 6,
					textAlign: 'center',
					fontFamily: 'subtitle',
					opacity: show ? '1' : '0',
					transition: '1s'
				}}
			>
				{children}
			</div>
		</div>
	);
};

class CardSystem extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			cards: props.children,
			show: false,
			current: 0
		};
	}

	handleShow = () =>
		this.setState({
			show: !this.state.show
		});

	handleNext = () => {
		if (this.state.current + 1 < this.state.cards.length) {
			this.setState({
				current: this.state.current + 1,
				show: false
			});
		}
	};

	handlePrev = () => {
		if (this.state.current - 1 > -1) {
			this.setState({
				current: this.state.current - 1
			});
		}
	};

	render() {
		const childrenWithProps = React.Children.map(this.props.children, (child) =>
			React.cloneElement(child, { show: this.state.show })
		);

		return (
			<div style={{ textAlign: 'center' }}>
				<span sx={{ fontFamily: 'Open Sans', fontSize: 4, fontVariant: 'all-small-caps' }}>
					Card {this.state.current + 1} out of{' '}
					{this.state.cards.length === undefined ? `1` : this.state.cards.length}
				</span>
				{childrenWithProps[this.state.current]}
				<div
					sx={{
						display: 'flex',
						flexDirection: 'row',
						position: 'fixed',
						bottom: '50px',
						left: 0,
						right: 0,
						margin: '0 auto',
						justifyContent: 'center'
					}}
				>
					{this.state.show && (
						<StyledButton
							sx={{
								padding: 3,
								backgroundColor: 'background',
								color: 'text',
								boxShadow: (theme) => `0 0 4px ${theme.colors.text}`,
								border: (theme) => `1px solid ${theme.colors.text}`,
								borderRadius: 2,
								fontFamily: 'subtitle',
								opacity: this.state.current === 0 ? '0.5' : '1'
							}}
							onClick={() => this.handlePrev()}
						>
							Prev
						</StyledButton>
					)}
					<StyledButton
						sx={{
							padding: 3,
							backgroundColor: 'background',
							color: 'text',
							boxShadow: (theme) => `0 0 4px ${theme.colors.text}`,
							border: (theme) => `1px solid ${theme.colors.text}`,
							borderRadius: 2,
							fontFamily: 'subtitle'
						}}
						onClick={() => this.handleShow()}
					>
						{this.state.show ? 'Hide Answer' : 'Show Answer'}
					</StyledButton>

					{this.state.show && (
						<StyledButton
							sx={{
								padding: 3,
								backgroundColor: 'background',
								color: 'text',
								boxShadow: (theme) => `0 0 4px ${theme.colors.text}`,
								border: (theme) => `1px solid ${theme.colors.text}`,
								borderRadius: 2,
								fontFamily: 'subtitle',
								opacity:
									this.state.cards.length === undefined
										? '0.5'
										: this.state.cards.length === this.state.current + 1 ? '0.5' : '1'
							}}
							onClick={() => this.handleNext()}
						>
							Next
						</StyledButton>
					)}
				</div>
			</div>
		);
	}
}

export default CardSystem;
