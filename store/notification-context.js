import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
	notification: null,
	showNotification: function () {},
	hideNotification: function () {},
});

export function NotificationContextProvider(props) {
	const [activeNotification, setActiveNotification] = useState();

	useEffect(() => {
		if (
			(activeNotification && activeNotification.status === 'success') ||
			activeNotification.status === 'error'
		) {
			const timer = setTimeout(() => {
				setActiveNotification(null);
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, [activeNotification]);

	function showNotification(notificationData) {
		setActiveNotification({
			title: notificationData.title,
			message: notificationData.message,
			status: notificationData.status,
		});
	}

	function hideNotification() {
		setActiveNotification(null);
	}

	const context = { notification: activeNotification, showNotification, hideNotification };

	return (
		<NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>
	);
}

export default NotificationContext;
