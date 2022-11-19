import axios from 'axios';
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from './Comment';
import { CommentContext } from './CommentContext';

const Container = styled.section`
	position: sticky;
  top: 0;
  left: 0;
  z-index:10;
  height: 100%;
  width: 100%;
	display: grid;
	place-items: left;
  color: white;
  background-color: #920ed031;
  backdrop-filter: blur(10px) saturate(160%) contrast(45%) brightness(140%);
  -webkit-backdrop-filter: blur(10px) saturate(160%) contrast(45%) brightness(140%);  
  border-radius: 0 0 16px;
`;

const Title = styled.h2`
  margin: 0;
  text-align: center;
  width: 100%;
`;

export const CommentForm = styled.form`
	position: relative;
  display: flex;
	flex-direction: column;
	flex-wrap: wrap;
  padding: 10px 20px 0 20px;
  transition: all 0.5s ease-in-out;
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const Input = styled.textarea`
	width: 100%;
	overflow: auto;
	resize: none;
	min-height: 25px;
  margin-bottom: 10px;
	line-height: 20px;
	font-size: 14px;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 500;
  padding: 10px 0;
	outline: none;
	border: none;
  background: transparent;
	border-bottom: 1px solid #434343;	
	color: white;
	&::placeholder {
		color: #c5c5c5;
	}
	&::-webkit-scrollbar {
		background: transparent;
	}
`;

export const CommentButtons = styled.div`
	padding-top: 10px;
	width: 100%;
	line-height: 60px;
	width: 100%;
	justify-content: flex-end;
	display: flex;
`;

const NewComment = () => {
  const [state, setState] = useState({author: "", text: ""})
  const {setComments} = useContext(CommentContext)

  const handleSend = async() => {
    try {
      const newComment = {
        author: state.author,
        text: state.text
      }
      const res = await axios.post("http://localhost:3000/api/comments", newComment)
      setComments((prev) => [...prev, res.data])
      setState({author: "", text: ""})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container >
      <CommentForm onSubmit={(e) => e.preventDefault()} >
      <Title >
        Happy Commenting!
      </Title>
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
      <CommentButtons>
        <Button 
          onClick={handleSend}
        >
          Send
        </Button>
      </CommentButtons>
    </Container>
  )
}

export default NewComment