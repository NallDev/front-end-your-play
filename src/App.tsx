import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailPage from './pages/DetailPage' // Make sure to adjust the path

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path=':id' element={<DetailPage />} />{' '}
            </Routes>
        </Router>
    )
}

export default App
