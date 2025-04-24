import styled from 'styled-components/native';
import { Dimensions, Modal, TouchableOpacity } from 'react-native';
// import { Modal } from 'react-native-paper';

const screen = Dimensions.get('window');
const screenWidth = screen.width;
const screenHeight = screen.height;

export const Container = styled.View`
      flex: 1;

      background-color: #F9F9F9;
`;

export const Header = styled.View`
      width: 100%;
      height: 15%;

      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      margin-top: 70px;
      padding: 0 30px;
`;

export const MessageBox = styled.View`
      flex-direction: column;
`;

export const Title = styled.Text`
      font-weight: 400;
      font-size: 18px;

      color: #000000;
`;

export const Subtitle = styled.Text`
      font-weight: 400;
      font-size: 15px;

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

      margin-bottom: 10px;
`;

export const Avatar = styled.Image`
      width: 100px;
      height: 100px;

      border-radius: 50px;
`;

export const Content = styled.View`
      flex: 1;
`;

export const AddButton = styled(TouchableOpacity)`
      width: 90%;
      height: 40px;

      justify-content: center;
      align-items: center;
      align-self: center;

      border-radius: 6px;
      border-width: 2px;
      border-color: #3E84A8;

      margin: 25px 0;
`;

export const Text = styled.Text`
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;
      text-align: center;

      color: #3E84A8;
      /* color: #FFEF61; */
`;

export const LogoutBtn = styled.Button`
      width: 30px;
      height: 30px;

      position: absolute;
      top: 30px;
      right: 10px;

      border-color: black;
`;

export const ModalContainer = styled(Modal)`
      border-radius: 10px;
      padding: 0 4%;
      background: transparent;
`;
