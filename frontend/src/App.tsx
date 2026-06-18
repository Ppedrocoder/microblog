import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Cadastro from './pages/cadastro'
import './App.css'
import Feed from './pages/feed'
import { AuthProvider } from './states/AuthContext'
import Comentarios from './pages/comentarios'

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
          <Route
          path="/postagem/:id"
          element={<Comentarios/>}
          />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
