import { useState } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from "@/context/AuthProvider";

import {
	Container,
	Header,
	MessageBox,
	Title,
	UserIcon,
	Avatar,
	Search,
	PetList,
	AddButton,
	Text,
} from "./styles";

import type { PetDTO } from "@/dtos/PetDTO";

import { PetCard } from "@/components/PetCard";
import { InputForm } from "@/components/InputForm";

export default function Pets() {
	const { user } = useAuth();

	const [search, setSearch] = useState("");

	let pets = [];

	if (search === "") {
		pets = user?.pets ? user?.pets : [];
	} else {
		pets = user?.pets
			? user?.pets.filter((item) => item.name.includes(search))
			: [];
	}

	function handleNavigationToAddPet() {
		router.navigate("/addPet");
	}

	function handleNavigationToPetDetails(pet: PetDTO) {
		router.push({
			pathname: '/petInfo',
			params: { petId: pet.id }});
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header>
					<MessageBox>
						<Title>{user?.name}, encontre seus pets aqui:</Title>
					</MessageBox>
					<UserIcon>
						{user?.avatar ? (
							<Avatar src={user?.avatar} />
						) : (
							<MaterialIcons name="person" size={60} color="#3E84A8" />
						)}
					</UserIcon>
				</Header>

				{user?.pets && (
					<Search>
						<InputForm
							icon
							placeholder="Buscar"
							value={search}
							onChangeText={setSearch}
						/>
					</Search>
				)}

				<PetList>
					<FlatList
						data={pets}
						keyExtractor={(item) => item.name}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<PetCard
								type={item.icon}
								name={item.name}
								avatar={item.avatar && item.avatar}
								onPress={() => handleNavigationToPetDetails(item)}
							/>
						)}
					/>

					<AddButton onPress={handleNavigationToAddPet}>
						<Text>Adicionar pet +</Text>
					</AddButton>
				</PetList>
			</Container>
		</TouchableWithoutFeedback>
	);
}
