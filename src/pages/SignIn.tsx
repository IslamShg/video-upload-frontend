import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../redux/store'
import { useUserActions } from '../redux/userSlice'
import { UserType } from '../shared'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`

const Title = styled.h1`
  font-size: 24px;
`

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`

const Links = styled.div`
  margin-left: 50px;
`

const Link = styled.span`
  margin-left: 30px;
`

const SignIn = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signInThunk, signUpThink } = useUserActions()

  const { loading } = useSelector((s: RootState) => s.user)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    signInThunk({
      name,
      password
    })
  }
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    signUpThink({
      name,
      password,
      email
    })
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Input
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="username"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="password"
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Input
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="username"
        />
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="email"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="password"
        />
        <Button onClick={(e) => handleSignUp(e)}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}

export default SignIn
