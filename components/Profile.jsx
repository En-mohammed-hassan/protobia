import PrmptCard from "./PrmptCard";

const Profile = ({ name, desc, handleDelete, handleEdit, data }) => {
	return (
		<div className="w-full">
			<h1 className="blue_gradient head_text">
				{" "}
				<span className="blue_gradient">{name} profile</span>{" "}
			</h1>
			<p className="desc text-left">{desc}</p>
			<div className="mt-8  prompt_layout">
				{data.map((post) => (
					<PrmptCard
						post={post}
						key={post._id}
						handleEdit={() => {
							handleEdit && handleEdit(post);
						}}
						handleDelete={() => {
							handleDelete && handleDelete(post);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Profile;
