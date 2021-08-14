import { dbConnect, insertOneToCollection } from 'helpers/db-utils';

async function handler(req, res) {
	const eventId = req.query.eventId;

	const client = await dbConnect();
	if (req.method === 'POST') {
		// add server side validation;

		const { email, name, text } = req.body;

		if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
			res.status(422).json({ message: 'Invalid input.' });

			return;
		}

		const newComment = {
			email,
			name,
			text,
			eventId,
		};

		const db = client.db();
		const result = await insertOneToCollection('comments', db, newComment);

		newComments.id = result.insertedId;

		res.status(201).json({ message: 'Created', comment: newComment });
	}

	if (req.method === 'GET') {
		const db = client.db();
		const documents = await db.collection('comments').find({ eventId }).sort({ _id: -1 }).toArray();
		res.status(200).json({ comments: documents });
	}
	client.close();
}

export default handler;
