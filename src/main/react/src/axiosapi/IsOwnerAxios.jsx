import AxiosInstance from "./AxiosInstance";

const IsOwnerAxios = {
  isOwner: async (coupleName, email) => {
    return await AxiosInstance.get(
      `/home/isMemberOfCouple?coupleName=${coupleName}&email=${email}`
    );
  },
};
export default IsOwnerAxios;
