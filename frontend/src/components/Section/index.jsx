import { Container } from './styles'

export function Select({ value, ...rest }) {
  return (
    <Container {...rest}>
      {value}
    </Container>
  )
}