import { useEffect, useState } from "react";
import {
	Alert,
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";

import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useAuth } from "@/context/AuthProvider";

import {
	Container,
	UserAvatar,
	Avatar,
	ChangePhotoBtn,
	Password,
	Form,
	Text,
	LngBox,
	LngIcon,
	// LngBtn,
	LngBtnLabel,
	LogoutBtnLabel,
	LogoutBtn,
} from "./styles";

import type { UserDTO } from "@/dtos/UserDTO";

import { AddHeader } from "@/components/AddHeader";
import { InputForm } from "@/components/InputForm";
import { PasswordInput } from "@/components/PasswordInput";
import { useToast } from "@/components/Toast";

export default function Tutor() {

	const { user, updateUser, changePassword, logOut } = useAuth();

	const { toast } = useToast();

	// const { t, i18n } = useTranslation();
	// const lng = i18n.language;
	// const [selectedLanguage, setSelectedLanguage] = useState("Português");

	// const [languageOpen, setLanguageOpen] = useState(false);
	const [photoIsLoading, setPhotoIsLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const [name, setName] = useState('');
	const [newPassword, setNewPassword] = useState("");

	const Brazil = require("@/assets/flag-br.png");
	const USA = require("@/assets/flag-us.png");
	const Spain = require("@/assets/flag-es.png");
	const France = require("@/assets/flag-fr.png");

	const languages = [
		{
			label: "Português",
			value: "pt",
			icon: () => <LngIcon source={Brazil} />,
		},
		{
			label: "English",
			value: "en",
			icon: () => <LngIcon source={USA} />,
		},
		{
			label: "Espanhol",
			value: "es",
			icon: () => <LngIcon source={Spain} />,
		},
		{
			label: "Francês",
			value: "fr",
			icon: () => <LngIcon source={France} />,
		},
	];

	async function handleSave() {
		try {
			if (newPassword === "") {
				const updatedUser = {
					...user,
					email: user?.email ? user.email : '',
					name
			  	};
				
				updateUser(updatedUser);

				toast("Seu nome foi alterada com sucesso.", "success", 4000, "bottom", false);
			} else {
				await changePassword(newPassword);
				toast("Sua senha foi alterada com sucesso.", "success", 4000, "bottom", false);
			}
		} catch (error) {
			toast("Ocorreu um problema, por favor tente novamente.", "destructive", 4000, "bottom", false);
		}
	}

	async function handleUserPhotoSelect() {
		setPhotoIsLoading(true);
		setOpen(false);

		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
			});

			if (photoSelected.canceled) {
				return;
			}

			if (photoSelected.assets[0].uri) {
				const photoInfo = await FileSystem.getInfoAsync(
					photoSelected.assets[0].uri,
				);

				if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {

					toast("Ocorreu um problema, por favor tente novamente.", "destructive", 4000, "bottom", false);

					setOpen(!open);
				}

				if (user) {
					const updatedUser = {
						...user,
						avatar: photoSelected.assets[0].uri,
					};

					updateUser(updatedUser);
				}

				toast("Sua foto foi alterada com sucesso.", "success", 4000, "bottom", false);

			}
		} catch (error) {
			toast("Ocorreu um problema, por favor tente novamente.", "destructive", 4000, "bottom", false);

		}
	}

	function handleLanguage() {
		// switch (selectedLanguage) {
		//       case 'pt':
		//             setSelectedLanguage("pt");
		//             i18n.changeLanguage("pt")
		//             break;
		//       case 'en':
		//             setSelectedLanguage("en");
		//             i18n.changeLanguage("en")
		//             break;
		//       case 'es':
		//             setSelectedLanguage("es");
		//             i18n.changeLanguage("es")
		//             break;
		//       case 'fr':
		//             setSelectedLanguage("fr");
		//             i18n.changeLanguage("fr")
		//             break;
		//       default:
		//             break;
		// }
	}

	// useEffect(() => {
	//       handleLanguage();
	// }, [selectedLanguage]);

	function handleSignOut() {
		Alert.alert(
			"Tem certeza?",
			`${user?.name} se você sair irá apagar todos os seus dados.`,
			[
				{
					text: "Cancelar",
					onPress: () => {},
				},
				{
					text: "Sair",
					onPress: logOut,
				},
			],
		);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<AddHeader
					style={{ height: 110 }}
					title="Profile"
					handleCancel={() => router.navigate("/home")}
					handleSave={handleSave}
				/>

				<UserAvatar>
					{user?.avatar ? (
						<Avatar src={user.avatar} />
					) : (
						<MaterialIcons name="person" size={100} color="#3E84A8" />
					)}
					<ChangePhotoBtn onPress={handleUserPhotoSelect}>
						<MaterialIcons name="add-a-photo" size={20} color="#FFEF61" />
					</ChangePhotoBtn>
				</UserAvatar>

				<Form>
					<InputForm
						placeholder={user?.name}
						placeholderTextColor="darkgray"
						// value={user?.name}
						onChangeText={setName}
					/>
					<InputForm
						placeholder={user?.email ? user.email : ''}
						placeholderTextColor="darkgray"
					/>
					<InputForm
						icon={false}
						value={newPassword}
						onChangeText={setNewPassword}
						placeholder="Nova senha"
						placeholderTextColor="darkgray"
						autoCapitalize="none"
						secureTextEntry={true}
					/>
					{/* <DropDownPicker
                                    style={style.dropdownContainer}
                                    dropDownContainerStyle={style.dropdown}
                                    placeholder={selectedLanguage}
                                    placeholderStyle={{ color: '#787878' }}
                                    open={languageOpen}
                                    value={selectedLanguage}
                                    items={languages}
                                    setOpen={setLanguageOpen}
                                    setValue={setSelectedLanguage}
                                    zIndex={2}
                              /> */}
				</Form>

				<LogoutBtn onPress={handleSignOut}>
					<LogoutBtnLabel>Sair</LogoutBtnLabel>
				</LogoutBtn>
			</Container>
		</TouchableWithoutFeedback>
	);
}

const style = StyleSheet.create({
	dropdownContainer: {
		width: "100%",
		minHeight: 65,
		flexDirection: "row",
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#BDBBBB",
		borderRadius: 6,
		backgroundColor: "transparent",
		zIndex: 10,
	},
	dropdown: {
		borderRadius: 0,
		borderColor: "#BDBBBB",
		backgroundColor: "transparent",
	},
});
