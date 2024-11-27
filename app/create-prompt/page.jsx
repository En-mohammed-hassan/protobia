"use client";
import Form from "@/components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const CreatPost = () => {
	const [post, setPost] = useState({ prompt: "", tag: "" });
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();

	const creatPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		console.log(session);
		try {
			const res = await fetch("http://localhost:3000/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
					id: session?.user.id,
				}),
			});
			if (res.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={creatPrompt}
		/>
	);
};

export default CreatPost;
