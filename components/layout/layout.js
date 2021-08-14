import { Fragment, useContext } from 'react';
import MainHeader from './main-header';
import Notification from 'components/ui/notification';
import NotificationContext from 'store/notification-context';

function Layout(props) {
	const notificationContext = useContext(NotificationContext);

	const activeNotification = notificationContext.notification;

	return (
		<Fragment>
			<MainHeader />
			<main>{props.children}</main>
			{activeNotification && (
				<Notification
					title={notificationContext.title}
					message={notificationContext.message}
					status={notificationContext.status}
				/>
			)}
		</Fragment>
	);
}

export default Layout;
