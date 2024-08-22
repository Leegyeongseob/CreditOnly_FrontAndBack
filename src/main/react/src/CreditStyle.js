import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const CreditStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button {
    font-family: 'HancomSans-Light_0', sans-serif;
  }

  @font-face {
    font-family: 'HancomSans-Light_0';
    font-weight: lighter;
    src: url('./font/HancomSans-Light_0.ttf') format('truetype');
  }

  /* 웹킷 기반 브라우저의 스크롤바 */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background-color: ${({ theme }) => theme.commponent};
  transition: background-color 0.5s ease-in;
}

::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.overflow};
  transition: background-color 0.5s ease-in;
  border-radius: 2px;
}
`;

export default CreditStyle;
