export type CheckDuplicationRequestResponse = {
  location: {
    name: string;
    address: string;
    code: string;
    city?: string;
    cityId?: string;
    acquisitionRewardType?: "Sampling" | "Promotion Code";
  };
  sessionUUID: string;
};
