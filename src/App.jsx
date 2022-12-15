import './App.scss';
import './basicStyle.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReplyPage } from 'pages';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ReplyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
