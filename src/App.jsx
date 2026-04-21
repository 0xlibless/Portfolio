import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import KeepIt from './pages/KeepIt';
import CustomCursor from './components/customcursor';

function App() {
  return (
    <HashRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keepit" element={<KeepIt />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
