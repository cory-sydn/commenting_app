import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CommentContext } from "./CommentContext";
import Reply from "./Reply";

const Container = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	padding: 0 0 10px;
	margin-left: ${(props) => (props.isChild ? "12px" : "0")};
	margin-bottom: ${(props) => (props.isChild ? "12px" : "0")};
	border-radius: 12px;
	width: ${(props) => (props.isChild ? "calc(100% - 24px)" : "100%")};
	background: #41466220;
	color: white;
`;

const CommentBody = styled.div`
	background: inherit;
	filter: hue-rotate(15deg);
	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	gap: 20px;
	padding: 10px;
	border-radius: 12px;
`;
const Author = styled.div`
	font-size: 13px;
	font-weight: 600;
`;

const Date = styled.span`
	font-size: 12px;
	font-weight: 500;
	margin-left: 5px;
`;

const Text = styled.div`
	white-space: pre-line;
`;

const CommentFoot = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export const Button = styled.button`
	outline: none;
	border: 1px solid #b65be4;
	background: linear-gradient(#b65be4, #9932cd);
	padding: 10px 20px;
	border-radius: 12px;
	cursor: pointer;
`;

const First = styled.div`
	padding: 8px 15px;
	align-items: center;
	gap: 16px;
	display: flex;
	justify-content: space-between;
`;

const Second = styled.div`
	padding: 0 15px;
	font-size: 12px;
	display: flex;
	align-items: center;
`;

const Appendix = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	transform: ${(props) =>
		props.isOpen ? "translate(0, 0)" : "translate(0, -80px)"};
	transition: all 0.3s ease;
`;

const Comment = ({ com, isChild }) => {
	const [startReply, setStartReply] = useState(false);
	const { comments, setComments } = useContext(CommentContext);

	const handleUpvote = async () => {
		try {
			const upvoted = {
				...com,
				upvotes: com.upvotes + 1,
			};
			const upvoteRes = await axios.put(
				`https://commenting-app.vercel.app/api/comments/${com._id}`,
				upvoted
			);
			const updatedList = comments.map((obj) => {
				if (obj._id === com._id) {
					return { ...upvoteRes.data };
				}
				return obj;
			});
			setComments(updatedList);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container isChild={isChild}>
			<CommentBody>
				<Author>
					{com?.author} &nbsp; &bull;{" "}
					<Date>{com?.createdAt.split("T")[0]} </Date>
				</Author>
				<Text>{com?.text} </Text>
			</CommentBody>
			<CommentFoot>
				<First>
					<Button onClick={handleUpvote}>upvote</Button>
					<div>
						{com?.upvotes > 1
							? com?.upvotes + " upvotes"
							: com?.upvotes === 0
							? "no upvote"
							: com?.upvotes + " upvote"}{" "}
					</div>
					{com?.childs?.length > 0 && (
						<div>
							{" "}
							{com?.childs?.length > 0
								? com?.childs?.length + "reply"
								: "no reply"}{" "}
						</div>
					)}
				</First>
				<Second>
					<Button onClick={() => setStartReply(true)}>reply</Button>
				</Second>
			</CommentFoot>
			<Appendix isOpen={startReply}>
				{startReply && (
					<Reply
						parentId={com?.parent ? com.parent : com._id}
						setStartReply={setStartReply}
					/>
				)}
			</Appendix>
			{com?.childs?.length > 0 &&
				comments.map(
					(reply) =>
						reply.parent &&
						reply.parent === com._id && (
							<Comment key={reply._id} com={reply} isChild={true} />
						)
				)}
		</Container>
	);
};

export default Comment;
