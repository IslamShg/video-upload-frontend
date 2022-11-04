import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import { darkTheme, lightTheme } from './utils/Theme'
import { BrowserRouter } from 'react-router-dom'

import './app/styles/global.scss'
import { Router } from './app/router'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const Container = styled.div`
  display: flex;
`

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`
const Wrapper = styled.div`
  padding: 22px 96px;
`

function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Provider store={store}>
          <BrowserRouter>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
            <Main>
              <Navbar />
              <Wrapper>
                <Router />
              </Wrapper>
            </Main>
          </BrowserRouter>
        </Provider>
      </Container>
    </ThemeProvider>
  )
}

export default App
