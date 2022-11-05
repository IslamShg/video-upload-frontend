import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js'

import { VideoType } from '../shared'

const Container = styled.div`
  width: ${(props: { type: string }) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;
`

const Image = styled.img`
  width: 100%;
  height: ${(props: { type: string }) =>
    props.type === 'sm' ? '120px' : '202px'};
  background-color: #999;
  flex: 1;
`

const Details = styled.div`
  display: flex;
  margin-top: ${(props: { type: string }) => props.type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
`

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props: { type: string }) => props.type === 'sm' && 'none'};
`

const Texts = styled.div``

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`

type CardProps = {
  type?: string
  video: VideoType
}

const Card: FC<CardProps> = ({
  type,
  video: { title, views, createdAt, user, },
}) => {
  return (
    <Link to="/video/test" style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"
        />
        <Details type={type}>
          <ChannelImage type={type} src={user.img} />
          <Texts>
            <Title>{title}</Title>
            <ChannelName>{user.name}</ChannelName>
            <Info>
              {views}  vviews  •  {format(createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  )
}

export default Card
