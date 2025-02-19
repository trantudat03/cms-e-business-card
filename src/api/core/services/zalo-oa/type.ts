export type ZaloInfoResponse = {
  error: number;
  message: string;
  id: string;
  name: string;
  data: {
    number: string;
  };
  picture: {
    data: {
      url: string;
    };
  };
  user_id_by_oa?: string;
};
