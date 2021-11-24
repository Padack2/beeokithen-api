export type NoticeDTO ={
    title: string,
    content: string,
    datetime: string,
    isNotice: boolean
}

export interface NoticeCreateDTO extends NoticeDTO {}

export interface NoticeDeleteDTO {
    id: string
}

export interface NoticeModifyDTO extends NoticeDTO {
    id: string,
}

export interface NoticeListDTO extends NoticeDTO {
    id: string
}

export interface NoticeDetailDTO extends NoticeDTO {
    id: string
}