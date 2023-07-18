import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Texture } from './components';
import { AdminPage } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin">
          <Route path="" element={<Texture />} />
        </Route>
        <Route path="/">
          <Route path="" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
