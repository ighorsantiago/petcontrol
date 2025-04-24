import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    
    background: #F9F9F9;
`;

export const Header = styled.View`
    width: 100%;
    height: 13%;

    flex-direction: row;
    justify-content: center;
    align-items: flex-end;

    border-width: 1px;
    border-radius: 30px;
    border-color: lightgray;

    padding: 29px 10px;
    margin-bottom: 30px;

    background-color: #F9F9F9;
`;

export const Button = styled(TouchableOpacity)`
    position: absolute;
    bottom: 30px;
    left: 30px;
`;

export const ButtonText = styled.Text`
    font-size: 21px;

    color: #E27E08;
`;

export const Title = styled.Text`
    font-size: 24px;

    color: #9B9B9B;
`;

export const PetInfoBox = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const PetIcon = styled.View`
    width: 100px;
    height: 100px;

    justify-content: center;
    align-items: center;
    
    border-radius: 50px;
    border-width: 4px;
    border-color: #559EC3;

    margin-right: 50px;
    margin-bottom: 10px;
`;

export const Avatar = styled.Image`
      width: 92px;
      height: 92px;

      border-radius: 46px;
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

      background-color: #3E84A8;
`;

export const PetInfoText = styled.Text`
    font-size: 20px;

    color: gray;
`;

// Novo layout
export const Content = styled.View`
    align-items: center;

    padding: 0 20px;
`;

// export const Content = styled.View`
//     align-items: center;

//     padding: 0 20px;
//     margin-top: 30px;
// `;

export const Subscreen = styled.View`
    flex: 1;

    /* justify-content: center;
    align-items: center; */

    /* background-color: red; */
`;
