import { Route, Routes } from "react-router-dom";
import './css/style.css';
import Main from './pages/Main/Main';
import Upload from './pages/Upload';
import Checker from './pages/Checker';

function App() {
  return (
    <div className="App fontRegular">
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/checker" element={<Checker/>}/>
      </Routes>
    </div>
  );
}

export default App;
