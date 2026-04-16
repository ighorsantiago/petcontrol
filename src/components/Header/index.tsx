import { Container, Pet, PetType, PetName, PageName } from './styles';

interface Props {
    pageName: string;
    type: 'dog' | 'cat';
    // img: string;
}

export function Header({ pageName, type }: Props) {
    return (
        <Container>
            {/* <PetPhoto source={img}/> */}
            <PageName>{pageName}</PageName>
            <Pet>
                <PetType name={type} size={100} />
                {/* <PetName>{name}</PetName> */}
            </Pet>
        </Container>
    );
}
