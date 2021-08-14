import { dbConnect, insertOneToCollection } from 'helpers/db-utils';

async function handler(req, res) {
	const { email } = req.body;

	if (req.method === 'POST') {
		if (!email || !email.includes('@')) {
			return res.status(422).json({ message: 'Invalid email address' });
		}
		const client = await dbConnect();

		await client.connect();
		const db = client.db();
		await insertOneToCollection('newsletter', db, { email });
		client.close();
		res.status(201).json({ message: 'Signed up!' });
	}
}

export default handler;
