import {
      Container,
      InfoBox,
      Label,
      Text,
} from './styles';

interface Props {
      name: string;
      weight: string;
      date: string;
}

export function DetailsCard({ name, weight, date }: Props) {
      return (
            <Container>
                  <InfoBox>
                        <Label>Nome:</Label>
                        <Text>{name}</Text>
                  </InfoBox>
                  <InfoBox>
                        <Label>Peso:</Label>
                        <Text>{weight}kg</Text>
                  </InfoBox>
                  <InfoBox>
                        <Label>Data:</Label>
                        <Text>{date}</Text>
                  </InfoBox>
            </Container>
      );
}