import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Update from './pages/Update'

function App() {
  const location=useLocation();
  return (
    <div>
      {location.pathname!=='/update' && <Header/>}
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/update' element={<Update/>}></Route>
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
