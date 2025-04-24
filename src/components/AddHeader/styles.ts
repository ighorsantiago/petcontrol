import { TouchableOpacity } from 'react-native';
import styled from "styled-components/native";

export const Container = styled.View`
      width: 100%;


      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;

      border-width: 1px;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      border-color: lightgray;

      padding: 29px 20px;
      margin-bottom: 30px;

      background-color: #F8F8F8;
`;

export const Button = styled(TouchableOpacity)``;

export const ButtonText = styled.Text`
      font-weight: 400;
      font-size: 16px;

      color: #E27E08;
`;

export const Title = styled.Text`
      font-weight: 400;
      font-size: 18px;

      color: #9B9B9B;
`;
