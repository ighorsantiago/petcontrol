import { Platform, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    height: 100%;
    /* flex: 1; */

    align-items: center;

    background-color: #F8F8F8;
`;

export const Header = styled.Image`
    width: 100%;
`;

export const LogoImg = styled.Image`
    width: 150px;
    height: 160px;
`;

export const LoginBox = styled.View`
    width: 100%;

    justify-content: center;
    align-items: flex-start;

    padding: 0 54px;

    /* margin-bottom: ${RFValue(20)}px;
    margin-top: ${RFValue(50)}px; */
`;

export const LogLabel = styled.Text`
    font-size: 18px;
    line-height: 21px;

    margin-bottom: 8px;

    color: #4A4A4A;
`;

export const ForgotButton = styled(TouchableOpacity)`
    align-self: flex-end;
`;

export const ForgotLabel = styled.Text`
    font-size: 14px;
    line-height: 16px;
    align-self: flex-end;

    /* margin-bottom: 8px; */

    color: #E9840E;
`;

export const LogButton = styled(TouchableOpacity)`
    width: 330px;
    height: 53px;

    justify-content: center;
    align-items: center;
    
    /* margin-top: 80px;
    margin-bottom: 5px; */

    border-radius: 6px;

    background-color: #3E84A8;
`;

export const LogText = styled.Text`
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
    font-size: 14px;

    text-align: center;

    color: #4A4A4A;
`;

export const SocialButtonsBox = styled.View`
    width: 100px;
    flex-direction: row;

    justify-content: center;

    margin-top: 5px;
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

    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: 10px;
    /* margin-top: ${Platform.OS === 'android' ? 10 : 30}px; */
    /* margin-bottom: ${Platform.OS === 'android' ? 5 : 0}%; */

    /* background-color: red; */
`;

export const SignUpText = styled.Text`
    font-size: 14px;

    color: #4A4A4A;
`;

export const SignUpButton = styled(TouchableOpacity)``;

export const SignUpButtonText = styled.Text`
    font-size: 14px;

    color: #E9840E;
`;
