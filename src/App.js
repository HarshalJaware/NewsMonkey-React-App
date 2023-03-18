import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter,Routes,Route} from "react-router-dom";

const App  = () => {
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress,setProgress] = useState(0);

    return (
      <div>
         <BrowserRouter>
              <LoadingBar
              height={3}
              color='yellow'
              progress={progress}
            />
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<News apiKey={apiKey} setProgress = {setProgress} 
 key="general" pageSize={pageSize} country="in" category="general"/>}/>
                <Route exact path="/business" element={<News apiKey={apiKey} setProgress = {setProgress} 
 key="business" pageSize={pageSize} country="in" category="business"/>}/>
                <Route exact path="/general" element={<News apiKey={apiKey} setProgress = {setProgress} 
 key="general" pageSize={pageSize} country="in" category="general"/>}/>
                <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress = {setProgress} 
 key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
                <Route exact path="/health" element={<News apiKey={apiKey} setProgress = {setProgress} 
 key="health" pageSize={pageSize} country="in" category="health"/>}/>
                <Route exact path="/science" element={<News apiKey={apiKey} setProgress = {setProgress} 
 key="science" pageSize={pageSize} country="in" category="science"/>}/>
                <Route exact path="/sports" element={<News apiKey={apiKey} setProgress = {setProgress} 
 key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
                <Route exact path="/technology" element={<News apiKey={apiKey} setProgress = {setProgress} 
 key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App;

