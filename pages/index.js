import Head from 'next/Head';

import NewsletterRegistration from 'components/input/newsletter-registration';
import EventList from 'components/events/event-list';
import { getFeaturedEvents } from 'helpers/api-utils';

function HomePage(props) {
	return (
		<div>
			<Head>
				<title>Events</title>
				<meta name='description' content='Find out event suit for your site' />
			</Head>
			<NewsletterRegistration />
			<EventList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 1800,
	};
}

export default HomePage;
