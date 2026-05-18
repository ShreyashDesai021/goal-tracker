import api
from "./axios";

export const exportGoals =
  async () => {

    const response =
      await api.get(
        "/export/goals",
        {
          responseType:
            "blob",
        }
      );

    return response.data;
  };