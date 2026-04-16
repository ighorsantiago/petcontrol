// import { RectButton } from "react-native-gesture-handler";
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type Props = {
    active: boolean;
};

export const Container = styled(TouchableOpacity)``;

export const OptionView = styled.View<Props>`
    min-width: 120px;
    height: 40px;

    text-align: center;
    justify-content: center;
    align-items: center;

    border-radius: 17px;
    /* border-radius: 70px; */
    border-width: 2px;
    border-color: #3e84a8;

    padding: 0 5px;

    margin: 5px;

    background-color: transparent;

    ${({ active }) => active && { backgroundColor: '#3E84A8' }}
`;

export const Title = styled.Text<Props>`
    font-size: 18px;
    font-weight: bold;

    /* color: #FFEF61; */
    color: #3e84a8;

    ${({ active }) => active && { color: '#FFEF61' }}
`;

// export const OptionView = styled.View`
//       /* width: 140px;
//       height: 140px; */
//       width: 170px;
//       height: 104px;

//       text-align: center;
//       justify-content: center;
//       align-items: center;

//       border-radius: 17px;
//       /* border-radius: 70px; */
//       border-width: 2px;
//       border-color: #3E84A8;

//       margin: 10px;

//       background-color: #3E84A8;
// `;

// export const Title = styled.Text`
//       font-size: 18px;
//       font-weight: bold;

//       color: #FFEF61;
//       /* color: #3E84A8; */
// `;
