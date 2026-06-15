import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Cadastro from './pages/cadastro'
import './App.css'
import Feed from './pages/feed'
import { AuthProvider } from './states/AuthContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route
          path="/login"
          element={<Login/>}
          />
          <Route
          path="/cadastro"
          element={<Cadastro/>}
          />
          <Route
          path="/"
          element={<Feed/>}
          />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
