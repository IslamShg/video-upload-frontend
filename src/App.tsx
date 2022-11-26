import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Menu from './components/Menu'
import { darkTheme, lightTheme } from './utils/Theme'
import Navbar from './components/Navbar'
import './app/styles/global.scss'
import { Router } from './app/router'
import { persistor, store } from './app/store'

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
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
              <Main>
                <Navbar />
                <Wrapper>
                  <Router />
                </Wrapper>
              </Main>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </Container>
    </ThemeProvider>
  )
}

export default App
