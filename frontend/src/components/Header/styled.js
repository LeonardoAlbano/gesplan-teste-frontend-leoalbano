import styled from "styled-components";

export const Container = styled.header`
    grid-area: header;

    height: 80px;
    width: 100%;

    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottoM-color: ${({ theme }) => theme.COLORS.BLUEGES};

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    

    background: ${({ theme }) => theme.COLORS.WHITE};

    > img {
        height: 50px;
        width: 115px;

        margin-bottom: 5px;
    }

`;