import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
      flex: 1;

      justify-content: center;
      align-items: center;

      /* background-color: black; */
`;

export const Content = styled.View`
      width: 80%;

      align-self: center;
      justify-content: center;

      /* background-color: red; */
`;

export const Box = styled.View`
      border-width: 3px;
      border-radius: 20px;
      border-color: #3E84A8;

      padding: 20px;
`;

export const Title = styled.Text`
      font-size: 18px;
      font-weight: bold;

      align-self: center;

      margin-bottom: 15px;

      color: black;
`;

export const BoxContent = styled.View`
      flex-direction: row;

      align-items: center;

      margin: 15px 0;
`;

export const InfoBox = styled.View`
      flex-direction: row;

      align-items: center;

      margin-bottom: 10px;

      /* background-color: gray; */
`;

export const Label = styled.Text`
      font-size: 16px;
      font-weight: bold;
      align-self: flex-end;

      color: black;
`;

export const Text = styled.Text`
      font-size: 16px;
      align-self: flex-end;

      margin-right: 20px;

      color: black;
`;
