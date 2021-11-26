import { ImageBlock } from "./image.dto";

export type StoreDTO = {
    id: string,
    order:number,
    title: string,
    phonenumber: string,
    operation: string,
    image: ImageBlock
}

export interface StoreCreateDTO extends Omit<StoreDTO, "id"> {
    id?: string
}

export interface StoreDeleteDTO {
    id: string
}