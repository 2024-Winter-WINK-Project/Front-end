import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    .container{
        width: auto;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10vh;
    }
`;
export default GlobalStyles;
