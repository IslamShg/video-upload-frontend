import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'

import SignIn from '../pages/SignIn'
import Video from '../pages/Video'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trends" element={<Home />} />
      <Route path="/subscriptions" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/video/:id" element={<Video />} />
    </Routes>
  )
}
