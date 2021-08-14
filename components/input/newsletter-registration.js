import { useRef, useContext } from 'react';
import * as yup from 'yup';

import classes from './newsletter-registration.module.css';
import NotificationContext from 'store/notification-context';

let schema = yup.object().shape({
	email: yup.string().email('Email is not valid'),
});

function NewsletterRegistration() {
	const inputEmailRef = useRef();

	const notiContext = useContext(NotificationContext);

	async function registrationHandler(event) {
		event.preventDefault();

		const emailValue = inputEmailRef.current.value;

		notiContext.showNotification({
			title: 'Signup ...',
			message: 'Registering for newsletter',
			status: 'pending',
		});

		try {
			const valid = await schema.validate({ email: emailValue });
			await fetch('/api/newsletter', {
				method: 'POST',
				body: JSON.stringify(valid),
				headers: { 'Content-Type': 'application/json' },
			});
			notiContext.showNotification({
				title: 'Success!',
				message: 'Successfully for register',
				status: 'success',
			});
		} catch (error) {
			notiContext.showNotification({
				title: 'Error!',
				message: error.message || 'Something error',
				status: 'error',
			});
			console.error(error);
		}

		// fetch user input (state or refs)
		// optional: validate input
		// send valid data to API
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						ref={inputEmailRef}
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
