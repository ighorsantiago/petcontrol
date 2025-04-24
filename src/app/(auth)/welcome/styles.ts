import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import styled from "styled-components/native";
// import { RectButton, RectButtonProps } from "react-native-gesture-handler";

type Rect = TouchableOpacityProps;

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-between;

    background-color: #3E84A8;
`;

export const Background = styled.ImageBackground`
    flex: 1;
`;

export const LogoImg = styled.Image`
    width: 207px;
    height: 217px;

    margin-top: 85px;
`;

export const ButtonsBox = styled.View`
    padding: 0px 49px;

    justify-content: center;
    align-items: center;

    margin-bottom: 132px;
`;

export const LogButton = styled(TouchableOpacity)`
    width: 330px;
    height: 53px;

    justify-content: center;
    align-items: center;
    
    margin-bottom: 10px;

    border-radius: 6px;

    background-color: #FFEF61;
`;

export const LogText = styled.Text`
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;

    text-align: center;

    color: #3E84A8;
`;

export const SignButton = styled(TouchableOpacity)`
    width: 330px;
    height: 53px;

    justify-content: center;
    align-items: center;
    
    border-radius: 6px;
    border: 1px solid #FFEF61;
`;

export const SignText = styled.Text`
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;

    text-align: center;

    color: #FFEF61;
`;
