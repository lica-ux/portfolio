import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Components from './pages/Components'
import Tokens from './pages/Tokens'
import About from './pages/About'
import CasePage from './pages/CasePage'

function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Wait for the new page to render before scrolling to the anchor
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView()
      }, 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
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
