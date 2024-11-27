"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut, useSession, getProviders, signIn } from "next-auth/react";

const Nav = () => {
	const { data: session } = useSession();
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const fetchProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		fetchProviders();
	}, []);

	return (
		<nav className="flex flex-between w-full mb-16 pt-3">
			<Link className="flex gap-2 flex-center" href="/">
				<Image
					alt="logo"
					className="object-contain"
					width={30}
					height={30}
					src="/assets/images/logo.svg"
				/>
				<p className="logo_text">Protobia</p>
			</Link>
			{/* desktop view */}
			<div className="hidden sm:flex">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button type="button" className="outline_btn" onClick={signOut}>
							Log out
						</button>
						<Link className="flex gap-2 flex-center" href="/profile">
							<Image
								alt="profile"
								className="rounded-full"
								width={37}
								height={37}
								src={session?.user.image}
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									className="black_btn"
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
								>
									Sign In with {provider.name}
								</button>
							))}
					</>
				)}
			</div>
			{/* mobile view */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							alt="profile"
							className="rounded-full cursor-pointer"
							width={37}
							height={37}
							src={session?.user.image}
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									onClick={() => {
										setToggleDropdown(false);
									}}
									className="dropdown_link"
									href="/profile"
								>
									Profile
								</Link>
								<Link href="/create-prompt" className="dropdown_link">
									Create Post
								</Link>
								<button
									type="button"
									className="black_btn mt-3 w-full"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
								>
									Log out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									className="black_btn"
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
