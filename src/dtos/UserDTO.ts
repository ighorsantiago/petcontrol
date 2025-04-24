import type { PetDTO } from '@/dtos/PetDTO';

export interface UserDTO {
    id?: string;
    name: string;
    email: string;
    pets?: PetDTO[];
    selectedPet?: PetDTO;
    avatar?: string;
}
