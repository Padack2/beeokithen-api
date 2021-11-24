import { ImageBlock, TmpImageBlock } from './image-create.dto'

export interface BannerDTO extends ImageBlock {
    id: string
}

export interface BannerCreateDTO extends Omit<BannerDTO, "id"> {
    id?: string
}

export interface BannerDeleteDTO {
    id: string
}