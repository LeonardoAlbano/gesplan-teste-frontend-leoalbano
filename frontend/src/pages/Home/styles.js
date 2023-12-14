import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height:100vh;

    display: grid;
    grid-template-rows: 105px auto;
    grid-template-areas: 
    "header"
    "content"
    ;

    > main {
        grid-area: content;
        overflow-y: scroll;
        padding: 64px 0;

        section:nth-child(1) {
            display: flex;
            gap: 18px;

            margin-bottom: 34px;

            button{
                width: 200px;
            }

            button:nth-child(2),
            button:nth-child(3) {
                width: 80px;
            }
        }
        
        section:nth-child(2){
            background: ${({ theme }) => theme.COLORS.BLUEGES};

            table{
                width: 100%;
                border: 1px solid white;
                border-collapse: collapse;

                box-shadow: 0 1rem 2rem -1rem rgba(0, 0, 0 , 0.3);
            }


            tbody tr:nth-child(odd){
                 background: #369eed;
            }

            th {
                width: 15%;
                text-align: start;

                padding: 15px 10px 15px 10px;
                border: 1px solid white;

                color: ${({ theme }) => theme.COLORS.WHITE };
            }

            td {
                padding: 15px 10px 15px 10px;
                border: 1px solid white;
            }

            td:nth-child(7),
            td:nth-child(1){
                text-align: center;  
            }

            td input{
                width: 24px;
                height: 24px;
                border: none;
                border-radius: 8px;
            }


            td button{
                background: none;
                border: none;

            }
        }


    }



`

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

`;



