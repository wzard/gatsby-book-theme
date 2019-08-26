import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeModal from './Addons/CodeModal';
import { Side, Full, FlashCard, FlashCards } from './Addons/NoteModal';
import { CardSystem, Card } from './FlashCard';
import { DownloadButton } from '../styles/styles';

export const wrapRootElement = ({ element }) => (
	<MDXProvider components={{ CodeModal, Side, Full, FlashCard, FlashCards, CardSystem, Card, DownloadButton }}>
		{element}
	</MDXProvider>
);
