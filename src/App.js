import './App.css'
import Login from './login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './signup'

function App() {
  
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
        {/* <Routes>
          <Route path='/' element={<Signup/>}></Route>
        </Routes> */}
      </BrowserRouter>
  )
}

export default App;
