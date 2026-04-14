export interface PetDTO {
    id: string;
    name: string;
    specie: string;
    icon: 'dog' | 'cat';
    breed: string;
    birth: string;
    gender: string;
    avatar?: string;
    selected?: boolean;
    weight: {
        id: string;
        amount: string;
        weighingDate: string;
    }[];
    food?: {
        id: string;
        name: string;
        amount: string;
        times: string;
        amountPerMeal: string;
    }[];
    vaccines?: {
        id: string;
        name: string;
        date: string;
        next?: string;
    }[];
    medications?: {
        id: string;
        name: string;
        date: string;
        hour: string;
    }[];
    hygiene?: {
        id: string;
        category: string;
        date: string;
        next?: string;
        where?: string;
    }[];
    deworming?: {
        id: string;
        name: string;
        date: string;
    }[];
    appointments?: {
        id: string;
        name: string;
        date: string;
        hour?: string;
    }[];
}
