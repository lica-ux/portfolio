import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Components from './pages/Components'
import Tokens from './pages/Tokens'
import About from './pages/About'
import CasePage from './pages/CasePage'

function Layout() {
  const { pathname } = useLocation()
  const hideNav = pathname.startsWith('/work/')
  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/components"        element={<Components />} />
        <Route path="/tokens"            element={<Tokens />} />
        <Route path="/about"             element={<About />} />
        <Route path="/work/baribuddy"    element={<CasePage slug="baribuddy" />} />
        <Route path="/work/booky"        element={<CasePage slug="booky" />} />
        <Route path="/work/sejfa"        element={<CasePage slug="sejfa" />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
