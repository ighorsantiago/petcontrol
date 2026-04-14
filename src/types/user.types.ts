import type { Pet } from './pet.types';

export interface User {
    id?: string;
    name: string;
    email: string;
    pets?: Pet[];
    selectedPet?: Pet;
    avatar?: string;
}
