import { createGlobalStyle } from 'styled-components';

const pname = window.location.pathname;
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

        @media (max-width: 699px){
            margin-top: ${pname === "/login" ? '0' : '5vh'};
            margin-bottom: 6vh;
        }
        
        
        @media (min-width: 700px){
            min-height: 100vh;
        }
    }
    
    
    
`

export default GlobalStyles;
