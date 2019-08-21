import React from 'react';
import { Layout as ThemeLayout, Main } from 'theme-ui';
import { Sidebar, BookTitle, BookSubTitle, Container, BookAuthor, ThemeButton, MainTitle } from '../../styles/styles';
import { ModalProvider } from '../Modal/Modal';

const Layout = ({ children, book }) => {
	return (
		<ThemeLayout>
			<ModalProvider>
				<Main>
					<Sidebar visible={true}>
						<MainTitle>
							<BookTitle>{book.name}</BookTitle>
							<BookSubTitle>{book.subtitle}</BookSubTitle>
							<BookAuthor>{book.author}</BookAuthor>
						</MainTitle>
						<ThemeButton />
					</Sidebar>

					<Container>{children}</Container>
				</Main>
			</ModalProvider>
		</ThemeLayout>
	);
};

export default Layout;
