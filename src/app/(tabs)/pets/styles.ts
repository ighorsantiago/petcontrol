import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;

    align-items: center;

    background-color: #f9f9f9;
`;

export const Header = styled.View`
    width: 100%;
    height: 20%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 20px 24px;
`;

export const MessageBox = styled.View`
    flex: 1;
    flex-direction: column;
    margin-right: 12px;
`;

export const Title = styled.Text`
    font-weight: 400;
    font-size: 18px;

    color: #000000;
`;

export const UserIcon = styled.View`
    width: 90px;
    height: 90px;

    flex-shrink: 0;
    justify-content: center;
    align-items: center;

    border-radius: 45px;
    border-width: 4px;
    border-color: #3e84a8;
`;

export const Avatar = styled.Image`
    width: 80px;
    height: 80px;

    border-radius: 40px;
`;

export const Search = styled.View`
    padding: 20px 15%;
`;

export const PetList = styled.View`
    width: 92%;
    max-height: 58%;

    justify-content: center;
    align-items: center;

    border-radius: 30px;
    border-width: 1px;
    border-color: lightgray;
`;

export const AddButton = styled(TouchableOpacity)`
    width: 65%;
    height: 39px;

    justify-content: center;
    align-items: center;

    margin: 25px 0;
    background-color: #3e84a8;
`;

export const Text = styled.Text`
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-align: center;

    color: white;
`;
