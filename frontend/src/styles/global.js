import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;


    }

    body{
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: black;

        -webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea, select {
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
        outline: none;
    }

    select{
        width: 100%;
        height: 56px;

        border: none;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.COLORS.WHITE};
    }


    
    textarea{
        width: 100%;
        height: 200px;

        border: none;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.COLORS.WHITE};

        padding: 20px;
    }

    a{
        text-decoration: none;
    }

    button, a{
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }


    .modalStyles{
        border: 1px solid red;
    }
`;