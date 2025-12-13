import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/providers/theme.provider'
import HomePage from '@/pages/home-page'

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Navbar? */}
        <div className="flex flex-col h-screen overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
