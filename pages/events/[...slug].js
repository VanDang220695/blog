import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { getFilteredEvents } from 'dummy-data';
import EventList from 'components/events/event-list';
import ResultsTitle from 'components/results-title/results-title';
import Button from 'components/ui/button';
import ErrorAlert from 'components/ui/error-alert';

function FilteredEventPage() {
	const router = useRouter();

	const filteredData = router.query.slug;

	console.log(filteredData);

	if (!filteredData) {
		return <p className='center'>Loading ...</p>;
	}

	const [filteredYear, filteredMonth] = filteredData;
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021) {
		return (
			<Fragment>
				<ErrorAlert>Invalid Filter. Please adjust your value.</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>No Event found.</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<div>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</div>
	);
}

export default FilteredEventPage;
