import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin : 0;
        padding : 0;
        box-sizing: border-box;
    }
    
    body, #root{
        border-left: 2px solid #F5F5F5;
        border-right : 2px solid #F5F5F5;
        overflow-x: hidden;
        @media (min-height: 600px){
            min-height: 100vh;
        }
    }
    
    
    
`

export default GlobalStyles;
