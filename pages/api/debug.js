import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
	const directory = path.resolve("./"); // Get the root directory
	const files = await fs.readdir(directory, { withFileTypes: true });

	res.status(200).json(files.map((file) => file.name));
}
