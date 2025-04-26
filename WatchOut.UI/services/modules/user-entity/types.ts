export type CreateCustomerPayload = {
  name: string;
  zip: string;
  authid: string;
}

export type CreateOwnerPayload = {
  name: string;
  zip: string;
  address: string;
  city: string;
  state: string;
  country: string;
  authid: string;
};
