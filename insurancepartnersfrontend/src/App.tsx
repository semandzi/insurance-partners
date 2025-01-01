
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import PartnerPage from './pages/PartnerPage'
import AddPartnerPage from './pages/AddPartnerPage'



 const  App: React.FC = () => {
     
  return (
      <>
          <Router>
            <Navbar></Navbar>
              <>
                  <Routes>
                      <Route path='/' element={<PartnerPage />}></Route>
                      <Route path='/add-partner' element={<AddPartnerPage/>}></Route>
                  </Routes>
              </>
            <Footer></Footer>
          </Router>
    </>
  )
}

export default App
