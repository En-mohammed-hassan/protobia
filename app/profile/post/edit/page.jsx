"use client";
import { Suspense } from "react";
import Form from "@/components/Form";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EditPost = () => {
	const [post, setPost] = useState({ prompt: "", tag: "" });
	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(true); // Add loading state
	const router = useRouter();
	const params = useSearchParams();
	const id = params?.get("id"); // Ensure params exists before accessing get()

	useEffect(() => {
		const fetchData = async () => {
			if (!id) return; // Avoid fetching if ID is missing
			try {
				const response = await fetch(`/api/prompt/${id}`);
				if (!response.ok) throw new Error("Failed to fetch post data");
				const post = await response.json();
				setPost(post);
			} catch (error) {
				console.error("Error fetching post:", error);
			} finally {
				setLoading(false); // Ensure loading state is updated
			}
		};

		fetchData();
	}, [id]);

	const editPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			if (!id) throw new Error("Post ID is missing"); // Add check for ID
			const response = await fetch(`http://localhost:3000/api/prompt/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (!response.ok) throw new Error("Failed to update the post");
			router.push("/");
		} catch (error) {
			console.error("Error updating post:", error);
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		// Display a loading state until the post data is fetched
		return <div>Loading...</div>;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Form
				type="Edit"
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={editPrompt}
			/>
		</Suspense>
	);
};

export default EditPost;
