import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Components from './pages/Components'
import Tokens from './pages/Tokens'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter basename="/portfolio/">
      <Nav />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/tokens"     element={<Tokens />} />
        <Route path="/about"      element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
