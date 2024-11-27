import { connecToDb } from "@/utils/database";
import Prompt from "@/models/Prompt";

export const POST = async (req) => {
	const { tag, prompt, id } = await req.json();

	try {
		await connecToDb();

		const newPrompt = new Prompt({
			tag,
			prompt,
			creator: id,
		});
		await newPrompt.save();
		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		console.log(error);

		return new Response("failed to create prompt ", { status: 500 });
	}
};
