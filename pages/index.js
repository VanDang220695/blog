import { getFeaturedEvents } from 'dummy-data';
import EventList from 'components/events/event-list';

function HomePage() {
	const featured = getFeaturedEvents();

	return (
		<div>
			<header>
				<nav></nav>
			</header>
			<EventList items={featured} />
		</div>
	);
}

export default HomePage;
