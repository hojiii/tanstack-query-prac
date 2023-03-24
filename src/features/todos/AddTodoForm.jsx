import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

const AddTodoForm = () => {
  const router = useRouter();
  const [todo, setTodo] = useState({
    title: "",
    author: "",
  });

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setTodo((pre) => ({ ...pre, [name]: value }));
  };

  const { mutate, isLoading, isSuccess, isIdle } = useMutation({
    mutationFn: async (payload) => {
      const data = await axios.post("http://localhost:4000/todos", payload);
      return data.data;
    },
    onSuccess: (data) => {
      router.push("/todos");
    },
  });

  return (
    <>
      <div>
        <input
          type="text"
          value={todo.title}
          name="title"
          onChange={changeInputHandler}
        />
        <input
          type="text"
          value={todo.author}
          name="author"
          onChange={changeInputHandler}
        />
      </div>
      <button
        disabled={isLoading}
        onClick={() => {
          mutate(todo);
        }}
      >
        {isLoading ? "등록중...." : "추가하기"}
      </button>
    </>
  );
};

export default AddTodoForm;
