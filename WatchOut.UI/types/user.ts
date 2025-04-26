export interface CustomerResponse {
    Customer: Customer;
  }
  export interface OwnerResponse {
      owner: Owner;
    }

enum Role {
    Owner,
    Customer
}
export type User = {
    Id : string
    Name : string
    Role : "Owner" | "Customer" | "ERROR ROLE"
}

export type Customer = {
    ID: number,
    Name: string,
    Zip: string,
    Uid:string
}

export type Owner = {
ID:number,
Name:string,
Zip:string,
Address:string,
City:string,
State:string,
Country:string,
Lat:number,
Long:number
Hours:string,
Oid:string
}
