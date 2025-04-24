import { type SetStateAction, useCallback, useEffect, useState } from "react";
import {
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Keyboard,
	StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container, Form } from "./styles";

import { useAuth } from "@/context/AuthProvider";
import type { PetDTO } from "@/dtos/PetDTO";
import type { UserDTO } from "@/dtos/UserDTO";

import { useToast } from "@/components/Toast";
import { InputForm } from "@/components/InputForm";
import { AddHeader } from "@/components/AddHeader";
import { Dropdown } from "@/components/Dropdown";

import { maskDate } from "@/utils/masks";
import { dogBreeds, catBreeds } from "@/utils/species";

type FormDataProps = {
	name: string;
	specie: string;
	breed: string;
	birth: string;
	weight: string;
	gender: string;
};

const petAddSchema = yup.object({
	name: yup.string().required("Informe o nome."),
	specie: yup.string().required("Informe a espécie."),
	breed: yup.string().required("Informe a raça."),
	birth: yup.string().required("Informe a data de nascimento."),
	weight: yup.string().required("Informe o peso."),
	gender: yup.string().required("Informe o gênero."),
});

export default function AddPet() {
	const { user, updateUser } = useAuth();
	// const { t } = useTranslation();

	const { toast } = useToast();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset,
	} = useForm<FormDataProps>({
		resolver: yupResolver(petAddSchema),
		defaultValues: {
			name: "",
			specie: "",
			breed: "",
			birth: "",
			weight: "",
			gender: "",
		},
	});

	const [selectedSpecie, setSelectedSpecie] = useState("");
	const [specieOpen, setSpecieOpen] = useState(false);
	const [genderOpen, setGenderOpen] = useState(false);
	const [breedOpen, setBreedOpen] = useState(false);

	const [isAdding, setIsAdding] = useState(false);
	const [showToast, setShowToast] = useState(false);

	const onBreedOpen = useCallback(() => {
		setSpecieOpen(false);
		setGenderOpen(false);
	}, []);

	const onSpecieOpen = useCallback(() => {
		setGenderOpen(false);
		setBreedOpen(false);
	}, []);

	const onGenderOpen = useCallback(() => {
		setSpecieOpen(false);
		setBreedOpen(false);
	}, []);

	const species = [
		{ label: "Cachorro", value: "Cachorro" },
		{ label: "Gato", value: "Gato" },
	];

	const genders = [
		{ label: "Macho", value: "Macho" },
		{ label: "Fêmea", value: "Fêmea" },
	];

	async function handleAddPet({
		name,
		specie,
		breed,
		birth,
		weight,
		gender,
	}: FormDataProps) {
		// async function handleAddPet() {

		const icon = specie === "Gato" ? "cat" : "dog";

		const now = new Date();
		const today = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        // const newId = uuidv4();

		try {
			setIsAdding(true);
            // console.log("Entrou no handleAddPet")

			const newPet: PetDTO = {
				id: String(new Date().getTime()),
				name,
				specie,
				icon,
				breed,
				birth,
				gender,
				weight: [
					{
						id: String(new Date().getTime()),
						amount: weight,
						weighingDate: today,
					},
				],
			};

			if (user?.name) {
				const pets = user?.pets ? user.pets : [];

				const updatedPets = [...pets, newPet];

				const updatedUser: UserDTO = {
					...user,
					pets: updatedPets,
				};
                // console.log(updatedUser)
				updateUser(updatedUser);
			}

			toast("Seu pet foi adicionado com sucesso.", "success", 4000, "bottom", false);
		} catch (error) {
			console.log("handleAddPet =>", error);

			toast("Ocorreu um problema, por favor tente novamente.", "destructive", 4000, "bottom", false);
			
			throw error;
		} finally {
			setIsAdding(false);

			router.navigate('/pets');
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

	return (
		// <KeyboardAvoidingView behavior="position" enabled>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<AddHeader
					style={{ height: 110 }}
					title="Adicionar pet"
					handleCancel={() => router.navigate("/(tabs)/home")}
					handleSave={handleSubmit(handleAddPet)}
				/>

				<Form>
					<Controller
						defaultValue=""
						control={control}
						name="name"
						render={({ field: { value, onChange } }) => (
							<InputForm
								style={{ backgroundColor: "#FFF" }}
								placeholder="Nome"
								value={value}
								onChangeText={onChange}
								errorMessage={errors.name?.message}
							/>
						)}
					/>

					<Controller
						defaultValue=""
						control={control}
						name="specie"
						render={({ field: { value, onChange } }) => (
							<Dropdown
								placeholder="Espécie"
								placeholderStyle={{ color: "#4A4A4A" }}
								open={specieOpen}
								onOpen={onSpecieOpen}
								onChangeValue={onChange}
								onSelectItem={(item) => setSelectedSpecie(String(item.value))}
								value={value}
								items={species}
								setOpen={setSpecieOpen}
								setValue={onChange}
								zIndex={5000}
								errorMessage={errors.specie?.message}
							/>
						)}
					/>

					<Controller
						defaultValue=""
						control={control}
						name="breed"
						render={({ field: { value, onChange } }) => (
							<Dropdown
								placeholder={"Raça"}
								placeholderStyle={{ color: "#4A4A4A" }}
								disabled={selectedSpecie === ""}
								open={breedOpen}
								onOpen={onBreedOpen}
								searchable={true}
								searchPlaceholder="Procure aqui..."
								onChangeValue={onChange}
								value={value}
								items={selectedSpecie === 'Cachorro' ? dogBreeds : catBreeds}
								// items={dogBreeds}
								setOpen={setBreedOpen}
								setValue={onChange}
								zIndex={5}
								errorMessage={errors.breed?.message}
							/>
						)}
					/>

					<Controller
						defaultValue=""
						control={control}
						name="birth"
						render={({ field: { value, onChange } }) => (
							<InputForm
								style={{ backgroundColor: "#FFF" }}
								placeholder="Data de nascimento"
								value={value}
								onChangeText={(e) => onChange(maskDate(e))}
								maxLength={10}
								keyboardType="numeric"
								errorMessage={errors.birth?.message}
							/>
						)}
					/>

					<Controller
						defaultValue=""
						control={control}
						name="weight"
						render={({ field: { value, onChange } }) => (
							<InputForm
								style={{ backgroundColor: "#FFF" }}
								placeholder="Peso"
								value={value}
								onChangeText={onChange}
								keyboardType="numeric"
								errorMessage={errors.weight?.message}
							/>
						)}
					/>

					<Controller
						defaultValue=""
						control={control}
						name="gender"
						render={({ field: { value, onChange } }) => (
							<Dropdown
								placeholder="Gênero"
								placeholderStyle={{ color: "#4A4A4A" }}
								open={genderOpen}
								onOpen={onGenderOpen}
								value={value}
								onChangeValue={onChange}
								items={genders}
								setOpen={setGenderOpen}
								setValue={onChange}
								zIndex={-1000}
								errorMessage={errors.gender?.message}
							/>
						)}
					/>
				</Form>
			</Container>
		</TouchableWithoutFeedback>
		// </KeyboardAvoidingView>
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
		backgroundColor: "#FFF",
	},
	dropdown: {
		borderRadius: 0,
		borderColor: "#BDBBBB",
	},
});
