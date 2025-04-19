import {BrowserRouter,Routes,Route} from 'react-router'
import {Home} from './components/home'
import { EditData } from './components/Edit'

import { Addata } from './components/adddata'
import { Header } from './components/header'
import { Deletedata} from './components/delete'

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path='/adddata' element={<Addata/>}></Route>
          <Route path='/editdata/:_id' element={<EditData/>}></Route>
          <Route path='/deletedata/:_id' element={<Deletedata/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
