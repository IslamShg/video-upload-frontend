import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import Card from '../components/Card'
import { VideoType } from '../shared'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Home = () => {
  const [videos, setVideos] = useState<VideoType[]>([])

  const { pathname } = useLocation()
  const [, videosTypeSlug] = /\/(\w+)/.exec(pathname) || []

  useEffect(() => {
    const fetchVideos = async () => {
      const videosType = videosTypeSlug ? videosTypeSlug : 'random'
      const { data: videos } = await axios.get<VideoType[]>(
        '/videos/' + videosType
      )
      setVideos(videos)
    }
    fetchVideos()
  }, [videosTypeSlug])

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Home
