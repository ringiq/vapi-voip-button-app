import { promises as fs } from "fs";
import path from "path";

async function getDirectoryTree(dirPath) {
	const entries = await fs.readdir(dirPath, { withFileTypes: true });

	const tree = await Promise.all(entries.map(async (entry) => {
		const fullPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			return {
				name: entry.name,
				type: "folder",
				children: await getDirectoryTree(fullPath) // Recursively get subdirectories
			};
		} else {
			return {
				name: entry.name,
				type: "file"
			};
		}
	}));

	return tree;
}

export default async function handler(req, res) {
	try {
		const directory = path.resolve("./"); // Get the root directory
		const tree = await getDirectoryTree(directory);

		res.status(200).json({ root: directory, structure: tree });
	} catch (error) {
		res.status(500).json({ error: error.toString() });
	}
}
