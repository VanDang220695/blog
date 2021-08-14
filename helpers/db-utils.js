import { MongoClient } from 'mongodb';

export const dbConnect = async () => {
	const uri =
		'mongodb+srv://super-admin:O1siJ8wMNObaT3pw@cluster0.lvkzv.mongodb.net/comments?retryWrites=true&w=majority';
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

	await client.connect();

	return client;
};

export const insertOneToCollection = async (collection, db, data) => {
	return db.collection(collection).insertOne(data);
};
