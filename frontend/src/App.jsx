import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Planejamento from './pages/Planejamento'
import Cadastro from './pages/Cadastro'
import Disclaimer from './pages/Disclaimer'

function App() {
  return (
    <Router basename='/geodata'>
      <Layout>
        <Routes>
          <Route path="/" element={<Planejamento />} />
          <Route path="/planejamento" element={<Planejamento />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App