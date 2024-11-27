import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section className="w-full max-w-full flex-start flex-col ">
			<h1 className="head_text text-left">
				{" "}
				<span className="blue_gradient">{type} prompt</span>{" "}
			</h1>
			<p className="desc text-left max-w-full mb-4">
				{" "}
				{type} and share amazing prompts withthe world ,and let your imagination
				run wild with any AI-powerd platforms
			</p>
			<label className="font-satoshi font-semibold text-base text-gray-700 ">
				Your AI Prompt
			</label>

			<form
				onSubmit={handleSubmit}
				className="mt-3 w-full max-w-2xl flex flex-col gap-7 text-gray-700"
			>
				<textarea
					value={post.prompt}
					required
					placeholder="write your prmpts here ..."
					onChange={(e) => setPost({ ...post, prompt: e.target.value })}
					className="form_textarea"
				></textarea>
				<label className="font-satoshi font-semibold text-base text-gray-700 ">
					Tag / #0
				</label>
				<input
					value={post.tag}
					required
					placeholder="#Tag"
					onChange={(e) => setPost({ ...post, tag: e.target.value })}
					className="form_input"
				></input>
				<div className="flex flex-end mx-3 mb-3 gap-4">
					<Link className="text-sm text-gray-500" href="/">
						cancel
					</Link>
					<button
						className="bg-primary-orange px-5 py-1.5 rounded-full text-white text-sm"
						type="submit"
						disabled={submitting}
					>
						{submitting ? `${type}ing ...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
