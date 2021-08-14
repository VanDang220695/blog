import { Fragment } from 'react';
import Head from 'next/head';

import { getFilteredEvents } from 'helpers/api-utils';
import EventList from 'components/events/event-list';
import ResultsTitle from 'components/results-title/results-title';
import Button from 'components/ui/button';
import ErrorAlert from 'components/ui/error-alert';

function FilteredEventPage({ hasError, notFound, date, filteredEvents, loading }) {
	if (loading) {
		return <p className='center'>Loading ...</p>;
	}

	if (hasError) {
		return (
			<Fragment>
				<ErrorAlert>Invalid Filter. Please adjust your value.</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	if (notFound) {
		return (
			<Fragment>
				<ErrorAlert>No Event found.</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const formatedDate = new Date(date.year, date.month - 1);

	return (
		<div>
			<Head>
				<title>filteredEvents</title>
				<meta name='description' content={`All Events for ${date.month}/${date.year}`} />
			</Head>
			<ResultsTitle date={formatedDate} />
			<EventList items={filteredEvents} />
		</div>
	);
}

export async function getServerSideProps(context) {
	const {
		params: { slug: filteredData },
	} = context;

	const [filteredYear, filteredMonth] = filteredData;

	if (!filteredData) {
		return { props: { loading: true } };
	}

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021) {
		return { props: { hasError: true } };
	}

	const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });
	if (!filteredEvents || filteredEvents.length === 0) {
		return { props: { notFound: true } };
	}

	return { props: { date: { month: numMonth, year: numYear }, filteredEvents } };
}

export default FilteredEventPage;
