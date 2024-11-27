"use client";
import Form from "@/components/Form";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const EditPost = () => {
	const [post, setPost] = useState({ prompt: "", tag: "" });
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();
	const params = useSearchParams();
	const id = params.get("id");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetch(`/api/prompt/${id}`);
				const post = await data.json();
				setPost(post);
			} catch (error) {}
		};
		if (id) fetchData();
	}, [id]);
	const editPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			if (id) {
				const res = await fetch(`http://localhost:3000/api/prompt/${id}`, {
					method: "PATCH",
					body: JSON.stringify({
						prompt: post.prompt,
						tag: post.tag,
					}),
				});
				if (res.ok) {
					router.push("/");
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={editPrompt}
		/>
	);
};

export default EditPost;
