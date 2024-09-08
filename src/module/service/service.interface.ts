export interface TService {
    name: String,
    description: String,
    price: Number,
    duration: Number,
    isDeleted: Boolean,
}

export interface TPayloadService {
    searchTerm: String,
    minPrice: number,
    maxPrice: number,
    sort: string,
    dsc: string
}