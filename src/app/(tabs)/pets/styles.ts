import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;

    align-items: center;

    background-color: #F9F9F9;
`;


export const Header = styled.View`
      width: 100%;
      height: 20%;
      /* height: 25%; */

      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding: 29px;

      /* background-color: red; */
`;

export const MessageBox = styled.View`
      flex-direction: column;
`;

export const Title = styled.Text`
      font-weight: 400;
      font-size: 18px;

      color: #000000;
`;

export const UserIcon = styled.View`
      width: 110px;
      height: 110px;

      justify-content: center;
      align-items: center;
      
      border-radius: 55px;
      border-width: 4px;
      border-color: #3E84A8;

      /* margin-right: 20px; */
`;

export const Avatar = styled.Image`
      width: 100px;
      height: 100px;

      border-radius: 50px;
`;

export const Search = styled.View`
      padding: 20px 15%;
`;

export const PetList = styled.View`
    width: 80%;
    max-height: 55%;
    /* max-height: 65%; */

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
    background-color: #3E84A8;
`;

export const Text = styled.Text`
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-align: center;

    color: white;
`;
