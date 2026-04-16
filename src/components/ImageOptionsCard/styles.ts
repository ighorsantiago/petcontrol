import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
    flex: 1;

    align-items: center;

    margin: 10px 12px;
`;

export const OptionView = styled.View`
    width: 170px;
    height: 170px;

    border-radius: 15px;
    border-width: 2px;
    border-color: #3e84a8;

    background-color: #fff;
`;

// export const OptionView = styled.View`
//       width: 170px;
//       height: 170px;

//       border-radius: 15px;

//       background-color: #3E84A8;
// `;

export const OptionIcon = styled(MaterialCommunityIcons)`
    margin-top: 10px;
`;

export const Name = styled.Text`
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;

    margin-top: 25px;
    margin-left: 16px;

    color: #3e84a8;
`;

// export const Name = styled.Text`
//       font-weight: 700;
//       font-size: 18px;
//       line-height: 21px;

//       margin-top: 25px;
//       margin-left: 16px;

//       color: #FFEF61;
// `;

export const ImageBox = styled.View`
    flex: 1;

    justify-content: center;
    align-items: center;

    margin: 0 20px;
`;

export const Image = styled.Image`
    /* width: 50px;
      height: 70px; */
`;
