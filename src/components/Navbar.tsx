import { VideoCallOutlined } from '@mui/icons-material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { RootState } from '../app/store'
import { Upload } from '../features/video'

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  svg {
    cursor: pointer;
  }
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text};
`

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`
const Navbar = () => {
  const [params] = useSearchParams()
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [searchInputVal, setSearchInputVal] = useState(
    params.get('search') || ''
  )
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate({
      pathname: '/',
      search: `?search=${searchInputVal || ''}`
    })
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              onKeyDown={(event) => {
                if (event.code === 'Enter') {
                  handleSearch()
                }
              }}
              value={searchInputVal}
              onChange={({ target }) => setSearchInputVal(target.value)}
              placeholder="Search"
            />
            <SearchOutlinedIcon onClick={handleSearch} />
          </Search>
          {user ? (
            <User>
              <VideoCallOutlined onClick={() => setVideoModalOpen(true)} />
              <Avatar />
              {user.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: 'none' }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN ffIN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {videoModalOpen && <Upload onClose={() => setVideoModalOpen(false)} />}
    </>
  )
}

export default Navbar
