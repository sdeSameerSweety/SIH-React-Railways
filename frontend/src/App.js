import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';

function App() {
  return (
    <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
