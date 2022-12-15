import './App.scss';
import './basicStyle.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReplyPage, MainPage } from 'pages';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ReplyPage />} />
          <Route path='main' element={<MainPage/>} />
          <Route path="reply" element={<ReplyPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
