import axios from 'axios';
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from './Comment';
import { CommentContext } from './CommentContext';
import {CommentForm,
  Input,
  CommentButtons} from './NewComment'

const Container = styled.section`
	position: static;
  z-index: 1;
  height: 100%;
  width: calc(100% - 24px);
  margin-inline: 12px;
	display: grid;
	place-items: left;
  color: white;
  background-color: #4d53741f;
  border-radius: 0 0 12px 12px;
`;

const CommentButtonsReply = styled(CommentButtons)`
	padding: 0 20px 10px 20px;
	justify-content: space-between;
`;

const Reply = ({parentId, setStartReply}) => {
  const [state, setState] = useState({author: "", text: ""})
  const {comments, setComments} = useContext(CommentContext)

  const handleSend = async() => {
    try {
      const newComment = {
        author: state.author,
        text: state.text,
        parent: parentId
      }
      const replyComment = await axios.post("http://localhost:3000/api/comments", newComment)
      const updatedParent = await axios.put(`http://localhost:3000/api/comments/reply/${parentId}`, {
        childId: replyComment.data._id,
      })
      const updatedList = comments.map((obj) => {
        if(obj._id === parentId) {
          return {...updatedParent.data}
        }
        return obj
      })
      
      setComments([...updatedList, replyComment.data])
      setState({author: "", text: ""})
      setStartReply(false)
    } catch (error) {
      console.log(error);
    }  
  }

  return (
    <Container >
      <CommentForm onSubmit={(e) => e.preventDefault()} >     
      <Input
					id="author"
					rows="1"
					placeholder="Your name..."
          value={state.author}
					type="text"
					onChange={(e) => setState((prev) => ({...prev, author: e.target.value}))}
          required
				/>
      <Input
					id="comment"
          value={state.text}
					rows="1"
					placeholder="Add a comment..."
					type="text"
					onChange={(e) => setState((prev) => ({...prev, text: e.target.value}))}
				/>
      </CommentForm>
      <CommentButtonsReply>
        <Button onClick={() => setStartReply(false)} >
          Close
        </Button> 
        <Button 
          onClick={handleSend}
        >
          Send
        </Button>
      </CommentButtonsReply>
    </Container>
  )
}

export default Reply