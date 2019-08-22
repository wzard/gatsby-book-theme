import React from 'react';
import { Layout as ThemeLayout, Main } from 'theme-ui';
import {
	Sidebar,
	SharingButtons,
	BookTitle,
	BookSubTitle,
	Container,
	BookAuthor,
	ThemeButton,
	MainTitle
} from '../../styles/styles';
import { ModalProvider } from '../Modal/Modal';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../seo';

const Layout = ({ children, book }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);
	console.log(data);

	return (
		<ThemeLayout>
			<SEO title={`${book.name}`} />
			<ModalProvider>
				<Main>
					<Sidebar visible={true}>
						<MainTitle>
							<BookTitle>{book.name}</BookTitle>
							<BookSubTitle>{book.subtitle}</BookSubTitle>
							<BookAuthor>{book.author}</BookAuthor>
						</MainTitle>
						<ThemeButton />
						<SharingButtons />
					</Sidebar>

					<Container>{children}</Container>
				</Main>
			</ModalProvider>
		</ThemeLayout>
	);
};

export default Layout;
