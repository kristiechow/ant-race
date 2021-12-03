import React from "react";
import LandingPage from "./pages/LandingPage";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const GlobalStyle = createGlobalStyle`
 html, body {
    font-family: 'Archivo', sans-serif;
    background-color: '#F4F4F4';
  }
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<LandingPage />} />    
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
