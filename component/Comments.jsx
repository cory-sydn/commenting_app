import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import Comment from './Comment'
import { CommentContext } from './CommentContext';
import NewComment from './NewComment'

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  width: 100%;
  gap:12px;
`;

const Wrap =styled.div`
  padding-inline: 24px;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  width: 100%;
  gap:12px;
`;

const Comments = () => {
  const {comments} = useContext(CommentContext)

  return (
    <Container>
        <NewComment />
        <Wrap>
          {comments?.length > 0 && comments.map((el) => el?.parent === "" && (
            <Comment key={el._id} com={el} comments={comments} />
          ))}
        </Wrap>
    </Container>
  )
}



export default Comments