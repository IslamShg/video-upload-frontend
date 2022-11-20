import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import { firebaseApp } from '../app/firebase-config'
import { uploadVideo } from '../redux/videoSlice'
import { useNavigate } from 'react-router-dom'
import { VideoType } from '../shared'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosSelector } from '../redux/selectors'
import { useAppDispatch } from '../redux/store'

type UploadProps = {
  onClose: () => void
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.black};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`

const Title = styled.h1`
  color: #fff;
  text-align: center;
`

const Close = styled.div`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
`

const Label = styled.label`
  font-size: 14px;
  color: #fff;
`

export const Upload: FC<UploadProps> = ({ onClose }) => {
  const [img, setImg] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)
  const [imgPerc, setImgPerc] = useState(0)
  const [videoPerc, setVideoPerc] = useState(0)
  const [tags, setTags] = useState([])
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    imgUrl: '',
    videoUrl: ''
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const videos = useSelector(getVideosSelector)

  const handleTagsInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTags(target.value.split(','))
  }

  const uploadFile = (file: File, urlType: 'imgUrl' | 'videoUrl') => {
    const storage = getStorage(firebaseApp)
    const fileName = new Date().getTime() + file?.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file, {})

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        const setFunc = urlType === 'imgUrl' ? setImgPerc : setVideoPerc
        setFunc(progress)
      },
      null,
      async () => {
        // setVideo(null)
        // setImg(null)
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        setInputs((prev) => ({ ...prev, [urlType]: downloadURL }))
        console.log('File available at: ', downloadURL)
      }
    )
  }

  useEffect(() => {
    if (video) {
      uploadFile(video, 'videoUrl')
    }
  }, [video])

  useEffect(() => {
    if (img) {
      uploadFile(img, 'imgUrl')
    }
  }, [img])

  const handleUpload = async () => {
    const { _id } = await dispatch(uploadVideo({ ...inputs, tags })).unwrap()
    if (_id) {
      navigate('/video/' + _id)
    }
    onClose()
  }

  return (
    <>
      <Container onClick={onClose}>
        <Wrapper onClick={(e) => e.stopPropagation()}>
          <Close onClick={onClose}>X</Close>
          <Title>Upload a video</Title>
          <Input
            type="text"
            placeholder="Title"
            onChange={({ target }) =>
              setInputs((prev) => ({ ...prev, title: target.value }))
            }
          />
          <Label>Video</Label>
          {videoPerc > 0 ? (
            'Video uploading...' + ' ' + videoPerc
          ) : (
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          )}
          <Desc
            onChange={({ target }) =>
              setInputs((prev) => ({ ...prev, desc: target.value }))
            }
            placeholder="Description"
            rows={8}
          />
          <Input
            onChange={handleTagsInput}
            type="text"
            placeholder="Separate tags with commas."
          />
          <Label>Image</Label>
          {imgPerc > 0 ? (
            'Image uploading...'
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
          <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
      </Container>
    </>
  )
}
