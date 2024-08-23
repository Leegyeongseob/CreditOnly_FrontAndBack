import AxiosInstance from "./AxiosInstance";

const GuestbookAxios = {
  getGuestBookEntries: async (coupleName) => {
    const response = await AxiosInstance.get(`/guestbook/${coupleName}`);
    return response.data;
  },

  addGuestBookEntry: async (entry) => {
    const response = await AxiosInstance.post("/guestbook", entry);
    return response.data;
  },

  updateGuestBookEntry: async (entryId, entry) => {
    await AxiosInstance.put(`/guestbook/${entryId}`, entry);
  },

  deleteGuestBookEntry: async (entryId, memberEmail) => {
    await AxiosInstance.delete(`/guestbook/${entryId}`, {
      params: { memberEmail },
    });
  },
  getMyImgUrl: async (email) => {
    const imgUrl = await AxiosInstance.get(`/guestbook/email/${email}`);
    return imgUrl;
  },
  getMyImgUrlEmail: async(email) =>{
    const imgUrlEmail = await AxiosInstance.get(`/guestbook/searchImgUrl/${email}`)
    return imgUrlEmail;
  }
};
export default GuestbookAxios;
