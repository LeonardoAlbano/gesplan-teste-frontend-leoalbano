import styled from 'styled-components'

export const Container = styled.select`
  width: 100%;
  height: 150px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
  color: black;

  border: none;
  resize: none;

  margin-bottom: 8px;
  border-radius: 10px;
  padding: 16px;

  &::placeholder {
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`