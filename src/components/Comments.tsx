import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  getCurrentUserSelector,
  getCurrentVidComsSelector
} from '../redux/selectors'
import { useVideoActions } from '../redux/videoSlice'
import Comment from './Comment'

const Container = styled.div``

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`

type CommentsProps = {
  videoId: string
}

const Comments: FC<CommentsProps> = ({ videoId }) => {
  const { getVideoComments } = useVideoActions()

  const commentList = useSelector(getCurrentVidComsSelector)
  const userData = useSelector(getCurrentUserSelector)

  useEffect(() => {
    getVideoComments({ videoId })
  }, [])

  return (
    <Container>
      <NewComment>
        <Avatar src={userData?.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {commentList.map((comment) => (
        <Comment key={comment._id} {...comment} />
      ))}
    </Container>
  )
}

export default Comments
