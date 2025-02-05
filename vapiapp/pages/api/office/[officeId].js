import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const { officeId } = req.query;

	if (!officeId) {
		return res.status(400).json({ message: "Office ID is required" });
	}

	try {
		const client = await clientPromise;
		const db = client.db("ringiq");
		const data = await db.collection("offices").find({'_id': officeId}).toArray();
		if ( data[0]?.vapiVoip?.enabled === true ) {
			res.status(200).json(data[0]?.vapiVoip);
		} else {
			res.status(400).json({ message: "Vapi token missing" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error });
	}
}

