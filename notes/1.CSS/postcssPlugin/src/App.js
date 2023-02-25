import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import Home from './pages/home';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <ConfigProvider 
      theme={{
        token: {
          colorPrimary: "%antdTheme%"
        }
      }}
      // theme={{
      //   token: {
      //     colorPrimary: 'themeApp',
      //   },
      // }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="follow" element={<div>关注</div>}></Route>
            <Route path="hot" element={<div>热榜</div>}></Route>
            <Route path="zvideo" element={<div>视频</div>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App;
