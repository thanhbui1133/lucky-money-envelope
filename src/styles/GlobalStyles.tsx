// globalStyles.js
"use client";
import { createGlobalStyle } from "styled-components";
// import 'sanitize.css';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    line-height: 1.5;
    font-size: 16px;
    max-width: 100vw !important;
  }
`;

export default GlobalStyle;
