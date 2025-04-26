import { api } from "@/services/api";
import {
  Customer,
  CustomerResponse,
  Owner,
  OwnerResponse,
  User,
} from "@/types/user";
import { CreateCustomerPayload, CreateOwnerPayload } from "./types";

class UserService {
  async createCustomer(createCustomerPayload: CreateCustomerPayload) {
    await api.post("user/customer", {
      authid: createCustomerPayload.authid,
      zip: createCustomerPayload.zip,
      name: createCustomerPayload.name,
    });
  }

  async createOwner(createOwnerPayload: CreateOwnerPayload) {
    await api.post("user/owner", {
      authid: createOwnerPayload.authid,
      zip: createOwnerPayload.zip,
      name: createOwnerPayload.name,
      address: createOwnerPayload.address,
      city: createOwnerPayload.city,
      state: createOwnerPayload.state,
      country: createOwnerPayload.country,
    });
  }

  async getUser(id: string): Promise<User> {
    try {
      const response_cust = await api.get<CustomerResponse>("user/userbyid", {
        params: { uid: id },
      });
      const cust = response_cust.data.Customer
      const res:User = {Id:cust.Uid, Name:cust.Name, Role:"Customer"}
      return res
    } catch (e) {
        try{
            const response_o = await api.get<OwnerResponse>("tv/ownerById", {
                params: { oid: id },
              });
              const owner = response_o.data.owner
              const o_res:User = {Id:owner.Oid, Name: owner.Name, Role:"Owner"}
              return o_res;
        }catch(e2){
            const err_res:User = {Id:"", Name:"", Role:"ERROR ROLE"}
            return err_res
        }

    }
  }
}

export const userService = new UserService();
