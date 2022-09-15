import axios from "@/api/axios";

const getTodos = async () => {
  return await axios.get("/todos").then((response) => {
    console.log(response.data, "todos");
    return response.data;
  });
};
  const createTodo = async ({ userId, title }) => {
  return await axios
    .post("/todos", {
      userId,
      title,
      completed: false,
    })
    .then((response) => {
      console.log(response.data, "createTodo");
      return response.data;
    });
};
export default { getTodos, createTodo };
