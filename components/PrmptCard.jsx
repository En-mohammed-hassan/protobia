"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
const PrmptCard = ({ post, handleClickEvent, handleDelete, handleEdit }) => {
	const { data: session } = useSession();
	const pathname = usePathname();
	const router = useRouter();
	const [coppied, setCoppied] = useState("");
	const handleCopy = () => {
		setCoppied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => {
			setCoppied("");
		}, 5000);
	};
	return (
		<div className="prompt_card">
			<div className="flex  items-start justify-between">
				<div className="flex justify-start items-center gap-3 cursor-pointer">
					<Image
						src={post.creator.image}
						alt="creator_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					></Image>
					<div className="flex flex-col">
						<h3 className="font-satoshi text-gray-900 font-semibold">
							{post.creator.username}
						</h3>
						<p className="text-gray-500 text-sm font-inter">
							{post.creator.email}
						</p>
					</div>
				</div>
				<div className="copy_btn" onClick={handleCopy}>
					<Image
						className=""
						src={
							coppied === post.prompt
								? "./assets/icons/tick.svg"
								: "./assets/icons/copy.svg"
						}
						width={16}
						height={16}
						alt="copy"
					></Image>
				</div>
			</div>
			<p className="text-sm font-satoshi min-h-16 max-h-16 text-gray-700 my-4 overflow-hidden text-ellipsis">
				{post.prompt}
			</p>

			{session?.user.id === post.creator._id && pathname === "/profile" ? (
				<div className="flex-between">
					<div className=" ">
						<p
							className="font-inter text-red-700 cursor-pointer "
							onClick={handleDelete}
						>
							DELETE
						</p>
					</div>
					<p
						className=" blue_gradient cursor-pointer text-sm font-inter w-24 text-ellipsis overflow-hidden"
						onClick={() => {
							handleClickEvent && handleClickEvent(post.tag);
						}}
					>
						#{post.tag}
					</p>

					<div className=" ">
						<p
							className="font-inter text-green-700 cursor-pointer  "
							onClick={handleEdit}
						>
							EDIT
						</p>
					</div>
				</div>
			) : (
				<p
					className=" blue_gradient cursor-pointer text-sm font-inter w-24 text-ellipsis overflow-hidden"
					onClick={() => {
						handleClickEvent && handleClickEvent(post.tag);
					}}
				>
					#{post.tag}
				</p>
			)}
		</div>
	);
};

export default PrmptCard;
