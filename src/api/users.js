import axios from "@/api/axios";

const getUsers = async () => {
  return await axios.get("/users").then((response) => {
    console.log(response.data, "api users");
    return response.data;
  });
};

export default getUsers;