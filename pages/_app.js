import Head from 'next/Head';

import Notification from 'components/ui/notification';
import Layout from 'components/layout/layout';
import { NotificationContextProvider } from 'store/notification-context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<NotificationContextProvider>
			<Layout>
				<Head>
					<title>Next Events</title>
					<meta name='description' content='NextJS Event' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				</Head>
				<Component {...pageProps} />
				<Notification />
			</Layout>
		</NotificationContextProvider>
	);
}

export default MyApp;
