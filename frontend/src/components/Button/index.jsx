import { Container } from "./styled";

// Criando o componente Button, que recebe as propriedades (props) title, loading, icon e outras propriedades (rest)
export function Button({ title, loading = false, icon, ...rest }) {
    return (
        
        <Container
            type="button" // Define o tipo do botão como "button"
            disabled={loading} // Desativa o botão se a propriedade loading for verdadeira
            {...rest} // Espalha as demais propriedades para o elemento Container
        >
            {loading ? 'Carregando...' : ( // Verifica se a propriedade loading é verdadeira
                <>
                    {icon && <span>{icon}</span>} {/* Renderiza um ícone (se existir) dentro de uma tag <span> */}
                    {title} {/* Renderiza o título do botão */}
                </>
            )}
        </Container>
    );
}
