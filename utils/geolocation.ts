interface AddressObj {
  city?: string;
  county?: string;
  country?: string;
  town?: string;
  state?: string;
}

export function getAddress(data?: AddressObj) {
  return data
    ? `${data?.city || data?.town || data?.state || data?.county}, ${
        data?.country
      }`
    : "";
}

