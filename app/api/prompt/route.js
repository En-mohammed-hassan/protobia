import { connecToDb } from "@/utils/database";
import Prompt from "@/models/Prompt";

export const GET = async (req) => {
	await connecToDb();

	try {
		const posts = await Prompt.find({}).populate("creator");

		return new Response(JSON.stringify(posts), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("error fetching data ", { status: 404 });
	}
};
