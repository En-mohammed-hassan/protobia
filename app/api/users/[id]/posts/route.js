import { connecToDb } from "@/utils/database";
import Prompt from "@/models/Prompt";

// we can use params directly by destructiring it like {params} insted of context
export const GET = async (req, context) => {
	await connecToDb();
	const params = await context.params;

	try {
		const posts = await Prompt.find({ creator: params.id }).populate("creator");

		return new Response(JSON.stringify(posts), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("error fetching data ", { status: 404 });
	}
};
