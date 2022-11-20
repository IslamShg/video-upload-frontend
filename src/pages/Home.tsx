import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import Card from '../components/Card'
import { getVideosSelector } from '../redux/selectors'
import { useVideoActions } from '../redux/videoSlice'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Home = () => {
  const { pathname } = useLocation()
  const [, videosTypeSlug] = /\/(\w+)/.exec(pathname) || []

  const { getVideos, searchVideos } = useVideoActions()
  const videos = useSelector(getVideosSelector)
  const [params] = useSearchParams()

  useEffect(() => {
    if (params.get('search')) {
      searchVideos({ q: params.get('search') })
      return
    }
    getVideos({ type: videosTypeSlug || 'random' })
  }, [videosTypeSlug, params])

  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Home
