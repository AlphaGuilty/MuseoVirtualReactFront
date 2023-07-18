import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Texture } from './components';
import { AdminPage } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<Texture />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
