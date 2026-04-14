export type PetIcon = 'dog' | 'cat';

export interface Weight {
    id: string;
    amount: string;
    weighingDate: string;
}

export interface Food {
    id: string;
    name: string;
    amount: string;
    times: string;
    amountPerMeal: string;
}

export interface Vaccine {
    id: string;
    name: string;
    date: string;
    next?: string;
}

export interface Medication {
    id: string;
    name: string;
    date: string;
    hour: string;
}

export interface Hygiene {
    id: string;
    category: string;
    date: string;
    next?: string;
    where?: string;
}

export interface Deworming {
    id: string;
    name: string;
    date: string;
}

export interface Appointment {
    id: string;
    name: string;
    date: string;
    hour?: string;
}

export interface Pet {
    id: string;
    name: string;
    specie: string;
    icon: PetIcon;
    breed: string;
    birth: string;
    gender: string;
    avatar?: string;
    selected?: boolean;
    weight: Weight[];
    food?: Food[];
    vaccines?: Vaccine[];
    medications?: Medication[];
    hygiene?: Hygiene[];
    deworming?: Deworming[];
    appointments?: Appointment[];
}
