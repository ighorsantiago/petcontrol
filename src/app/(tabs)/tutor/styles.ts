import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { PasswordInput } from '@/components/PasswordInput';

type Props = {
    isFilled: false;
};

export const Container = styled.View`
    flex: 1;

    align-items: center;
`;

export const Text = styled.Text`
    font-size: 18px;

    text-align: center;
    margin-bottom: 30px;

    color: #787878;
`;

export const UserAvatar = styled.View`
    width: 120px;
    height: 120px;

    justify-content: center;
    align-items: center;

    border-radius: 60px;
    border-width: 4px;
    border-color: #559ec3;

    margin-bottom: 40px;
`;

export const Avatar = styled.Image`
    width: 110px;
    height: 110px;

    border-radius: 55px;
`;

export const ChangePhotoBtn = styled(TouchableOpacity)`
    width: 30px;
    height: 30px;

    position: absolute;
    bottom: -5px;
    right: -5px;

    justify-content: center;
    align-items: center;

    border-radius: 15px;

    background-color: #3e84a8;
`;

export const Form = styled.View`
    width: 80%;
`;

export const Password = styled(PasswordInput)<Props>`
    width: 100%;
    min-height: 65px;

    flex-direction: row;

    margin-bottom: 10px;
    padding: 0 8px;

    border: 1px solid #bdbbbb;
    ${({ isFilled }) =>
        !isFilled && {
            borderColor: 'red',
        }}
    border-radius: 6px;
`;

export const LngBox = styled.View`
    flex-direction: row;
`;

export const LngIcon = styled.Image`
    width: 20px;
    height: 20px;

    /* background-color: darkgray; */
`;

export const LngBtnLabel = styled.Text``;

export const LogoutBtn = styled(TouchableOpacity)`
    width: 50%;
    height: 30px;

    justify-content: center;
    align-items: center;

    /* border: 1px solid #BDBBBB; */
    border: 1px solid red;
    border-radius: 8px;

    margin-top: 20px;

    /* background-color: red; */
`;

export const LogoutBtnLabel = styled.Text`
    color: red;
`;
