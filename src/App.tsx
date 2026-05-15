import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Explore from './pages/explore/Explore'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/explore" element={<Explore />} />
        {/* Fallback to Explore for this mount point */}
        <Route path="*" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
