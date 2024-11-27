"use client";

import { useState, useEffect } from "react";
import PrmptCard from "./PrmptCard";

const PromptCardList = ({ handleTagClick, data }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PrmptCard post={post} key={post._id} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchdata = async () => {
			const res = await fetch("/api/prompt");
			const data = await res.json();
			setPosts(data);
		};
		fetchdata();
	}, []);
	const handleSearchChange = (e) => {};
	return (
		<section className="feed">
			<form className=" relative w-full flex-center">
				<input
					className=" search_input "
					type="text"
					value={searchText}
					onChange={handleSearchChange}
					required
					placeholder="Search for a tag or username "
				/>
			</form>

			<div className="">
				<PromptCardList data={posts} handleTagClick={() => {}} />
			</div>
		</section>
	);
};

export default Feed;
