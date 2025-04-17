import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Entries from './components/Entries'
import DeleteConfirm from './pages/deleteConfirm'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Detail from './pages/Detail'

function App() {
  const location=useLocation();
  return (
    <div>
      {location.pathname=='/homepage' && <Header/>}
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
          <Route path='/homepage' element={<HomePage/>}></Route>
          <Route path='/update' element={<Detail/>}></Route>
          <Route path='/entries' element={<Entries/>}></Route>
          <Route path='/delete' element={<DeleteConfirm/>}></Route>
        </Routes>
    </div>
  )
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
