import { Float } from "react-native/Libraries/Types/CodegenTypes";

export interface BarResponse {
    owners: Bar[];
}

export interface SingleBarResponse {
    owner: Bar;
}

export type Bar = {
    Oid : string
    Name : string
    Zip : string
    Address : string
    City: string
    State: string
    Country: string
    Lat: Float
    Long: Float
    Hours: String
    IsFav: boolean
}