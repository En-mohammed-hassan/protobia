"use client";
import Profile from "@/components/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const myProfile = () => {
	const router = useRouter();
	const [posts, setPosts] = useState([]);
	const handleDelete = async (post) => {
		const isConfirmmed = confirm("Are you sure w=you want to delete this post");
		if (isConfirmmed) {
			try {
				await fetch(`api/prompt/${post._id.toString()}`, { method: "DELETE" });
				const filtterdPost = posts.filter((p) => p._id !== post._id);
				setPosts(filtterdPost);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const handleEdit = async (post) => {
		router.push(`/profile/post/edit?id=${post._id}`);
	};
	const { data: session } = useSession();
	useEffect(() => {
		console.log("runed");
		console.log(session?.user.id);
		const fetchdata = async () => {
			const res = await fetch(
				`http://localhost:3000/api/users/${session?.user.id}/posts`
			);
			const data = await res.json();
			setPosts(data);
			console.log("fetching data for user");
			console.log(data);
		};
		if (session?.user.id) fetchdata();
	}, [session?.user?.id]);
	return (
		<div>
			<Profile
				name="My"
				desc="welcome to your pesonal profile page "
				data={posts}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
			></Profile>
		</div>
	);
};

export default myProfile;
