import { connecToDb } from "@/utils/database";
import Prompt from "@/models/Prompt";

// we can use params directly by destructiring it like {params} insted of context
export const GET = async (req, { params }) => {
	try {
		await connecToDb();
		const post = await Prompt.findById(params.id);
		if (!post) return new Response("post is not exist ", { status: 404 });

		return new Response(JSON.stringify(post), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("error fetching data ", { status: 500 });
	}
};
export const PATCH = async (req, { params }) => {
	const { tag, prompt } = await req.json();

	try {
		await connecToDb();
		const existPost = await Prompt.findById(params.id);
		if (existPost) {
			existPost.prompt = prompt;
			existPost.tag = tag;
			await existPost.save();
			return new Response(JSON.stringify(existPost), { status: 200 });
		} else return new Response("the post is not exist", { status: 404 });
	} catch (error) {
		console.log(error);
		return new Response("failed updating post", { status: 500 });
	}
};

export const DELETE = async (req, { params }) => {
	try {
		await connecToDb();
		console.log(params.id);
		await Prompt.findByIdAndDelete(params.id);
		console.log("deleted successfully");
		return new Response("deleted successfuly", { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("error in delet post", { status: 500 });
	}
};
