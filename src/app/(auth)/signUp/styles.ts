import { TouchableOpacity } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

interface Props {
    activeOpacity: boolean;
}

export const Container = styled.View`
    width: 100%;
    height: 100%;

    align-items: center;

    background-color: #F8F8F8;
`;

export const Header = styled.Image``;

export const LogoImg = styled.Image`
    width: 150px;
    height: 160px;
`;

export const RegisterBox = styled.View`
    width: 100%;

    justify-content: center;
    align-items: flex-start;

    padding: 0 54px;

    margin-top: -20px;
`;

export const RigisterLabel = styled.Text`
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;

    margin-bottom: 8px;

    color: #4A4A4A;
`;

export const RegisterButton = styled(TouchableOpacity)`
    width: 330px;
    height: 53px;

    justify-content: center;
    align-items: center;
    
    margin-top: 30px;
    margin-bottom: 5px;

    border-radius: 6px;

    background-color: #3E84A8;
`;

export const RegisterText = styled.Text`
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;

    text-align: center;

    color: #FFEF61;
`;

export const SocialBox = styled.View`
    width: 100%;
    height: 10%;

    align-items: center;
`;

export const SocialLabel = styled.Text`
    font-weight: 400;
    font-size: 14px;

    text-align: center;

    color: #4A4A4A;
`;

export const SocialButtonsBox = styled.View`
    width: 100px;
    flex-direction: row;

    justify-content: center;

`;

export const SocialButton = styled(TouchableOpacity)`
    flex-direction: row;

    justify-content: center;
    align-items: center;

    margin-top: 10px;
    margin-right: 10px;
`;

export const Footer = styled.View`
    width: 100%;
    height: 16px;

    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const SignUpText = styled.Text`
    font-weight: 400;
    font-size: 14px;

    color: #4A4A4A;
`;

export const SignUpButton = styled(TouchableOpacity)``;

export const SignUpButtonText = styled.Text`
    font-weight: 400;
    font-size: 14px;

    color: #E9840E;
`;
