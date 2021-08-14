import { Fragment } from 'react';
import Head from 'next/head';

import Comments from 'components/input/comments';
import { getEventById, getAllEvents } from 'helpers/api-utils';
import EventSummary from 'components/event-detail/event-summary';
import EventLogistics from 'components/event-detail/event-logistics';
import EventContent from 'components/event-detail/event-content';

function EventDetailPage({ selectedEvent: event }) {
	if (!event) {
		return <p>No event found!</p>;
	}

	return (
		<Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name='description' content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event.id} />
		</Fragment>
	);
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);
	return {
		props: {
			selectedEvent: event,
			revalidate: 30,
		},
	};
}

export async function getStaticPaths() {
	const allEvents = await getAllEvents();
	const paths = allEvents.map(event => ({ params: { eventId: event.id } }));

	return {
		paths,
		fallback: false,
	};
}

export default EventDetailPage;
