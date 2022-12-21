export interface ListResponseModel<T> {
    message?: string
    error?: number
    data?: T[]
}

export interface DataResponseModel<T> {
    message?: string
    error?: number
    data?: T
}

export type EventType = React.ChangeEvent<HTMLInputElement>


export type sizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'