import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Update from './pages/Update'
import Entries from './components/Entries'
import DeleteConfirm from './pages/deleteConfirm'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  const location=useLocation();
  return (
    <div>
      {location.pathname=='/homepage' && <Header/>}
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
          <Route path='/homepage' element={<HomePage/>}></Route>
          <Route path='/update' element={<Update/>}></Route>
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
