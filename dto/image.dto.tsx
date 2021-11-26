export interface TmpImageBlock {
    imageFile: FileList
}
export interface ImageBlock {
    order: number
    storageRef: string,
    downloadUrl: string
}

export interface ImageBlocks {
    imageFileList: ImageBlock[]
}