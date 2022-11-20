import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { VideoType } from '../shared'
import Card from './Card'

const Recommendation = styled.div`
  flex: 2;
`

type RecommendationsProps = {
  tags: string[]
}

export const Recommendations: FC<RecommendationsProps> = ({ tags }) => {
  const [recommendedVideos, setRecommendedVideos] = useState<VideoType[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get<VideoType[]>('/videos/tags', {
        params: {
          tags: tags.join(',')
        }
      })
      setRecommendedVideos(data)
    }
    fetchVideos()
  }, [])

  return (
    <Recommendation>
      {recommendedVideos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Recommendation>
  )
}
