import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js'
import Comments from '../components/Comments'
import { useUserActions } from '../features/user/userSlice'
import { useVideoActions } from '../features/video'
import { Recommendations } from '../features/video/components/Recommendations'
import {
  getCurrentUserSelector,
  getCurrentVideoAuthorSelector,
  getCurrentVidSelector
} from '../shared/selectors'

const Container = styled.div`
  display: flex;
  gap: 24px;
`

const Content = styled.div`
  flex: 5;
`
const VideoWrapper = styled.div``

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`

const Recommendation = styled.div`
  flex: 2;
`
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`

const ChannelName = styled.span`
  font-weight: 500;
`

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`

const VideoFrame = styled.video`
  max-height: 720px;
  min-height: 400px;
  width: 100%;
  object-fit: cover;
`

const Description = styled.p`
  font-size: 14px;
`

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`

const Video = () => {
  const params = useParams()
  const videoId = params.id

  const { getVideoById, likeVideoById, dislikeVideoById } = useVideoActions()
  const { getCurrentChannelAuthor, subscribeChannelThunk } = useUserActions()
  const videoData = useSelector(getCurrentVidSelector)
  const userData = useSelector(getCurrentUserSelector)
  const currentVideoAuthor = useSelector(getCurrentVideoAuthorSelector)

  const isSubscribed = userData?.subscribedUsers.includes(videoData?.userId)

  useEffect(() => {
    getVideoById({ videoId })
  }, [])

  useEffect(() => {
    if (videoData) {
      getCurrentChannelAuthor({ authorId: videoData.userId })
    }
  }, [videoData])

  const handleLike = () => {
    const isLiked = videoData?.likes.includes(userData._id)
    const type = isLiked ? 'remove' : 'set'
    likeVideoById({ type, userId: userData._id, videoId })
  }

  const handleDislike = async () => {
    const isDisliked = videoData?.dislikes.includes(userData._id)
    const type = isDisliked ? 'remove' : 'set'
    dislikeVideoById({ type, userId: userData._id, videoId })
  }

  const subscribeUser = () => {
    const type = isSubscribed ? 'unsub' : 'sub'
    subscribeChannelThunk({ type, channelId: videoData.userId })
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={videoData?.videoUrl} controls />
        </VideoWrapper>
        <Title>{videoData?.title}</Title>
        <Details>
          <Info>
            {videoData?.views} views • {format(videoData?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {videoData?.likes.includes(userData._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {videoData?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {videoData?.dislikes.includes(userData._id) ? (
                <>
                  <ThumbDownIcon />
                  {videoData?.dislikes.length}
                </>
              ) : (
                <>
                  <ThumbDownOffAltOutlinedIcon /> Dislike
                </>
              )}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={currentVideoAuthor?.img} />
            <ChannelDetail>
              <ChannelName>{currentVideoAuthor?.name}</ChannelName>
              <ChannelCounter>
                {currentVideoAuthor?.subscribers} subscribers
              </ChannelCounter>
              <Description>{videoData?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          {videoData?.userId !== userData?._id && (
            <Subscribe onClick={subscribeUser}>
              {isSubscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}
            </Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={videoId} />
      </Content>
      {videoData?.tags.length > 0 && <Recommendations tags={videoData.tags} />}
    </Container>
  )
}

export default Video
