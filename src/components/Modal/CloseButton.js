import React from 'react';
import CloseIcon from './CloseIcon';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = styled(`button`)`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0.2rem;
  position: absolute;
  top: ${(props) => (props.top ? props.top : '20px')};
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  opacity: 0.5;
  transition: opacity 0.5s;
  cursor: pointer;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  :hover {
    opacity: 1;

    svg {
      color: #ffffff;
    }
  }
`;

const CloseButton = ({ onClick, className, children, textColor }) => (
	<Button
		onClick={onClick}
		style={{
			position: 'fixed',
			top: '20px',
			right: '30px',
			cursor: 'pointer',
			zIndex: 1
		}}
		className={className}
		gatsby-modal-close-button="true"
	>
		{!children ? <CloseIcon textColor={textColor} /> : children}
	</Button>
);

CloseButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string
};

export default CloseButton;
