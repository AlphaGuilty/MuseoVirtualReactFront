import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Texture } from './components';
import { AdminPage } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Texture />} />
      </Routes>
      <Routes>
          <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
