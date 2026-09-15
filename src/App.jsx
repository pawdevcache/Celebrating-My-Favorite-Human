import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CreaseScroll from './components/CreaseScroll'

import Home from './pages/Home'
import Cake from './pages/Cake'
import OurStory from './pages/OurStory'
import Reasons from './pages/Reasons'
import Gallery from './pages/Gallery'
import LongDistance from './pages/LongDistance'
import Letter from './pages/Letter'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CreaseScroll />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cake" element={<Cake />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/reasons" element={<Reasons />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/long-distance" element={<LongDistance />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
