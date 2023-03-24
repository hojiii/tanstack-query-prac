import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styled from "styled-components";

const Todo = () => {
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    author: "",
  });

  const { query, push, back } = useRouter();
  const { data: todo } = useQuery({
    queryKey: ["GET_TODO"],
    queryFn: async () => {
      const data = await axios.get(`http://localhost:4000/todos/${query.id}`);
      return data.data;
    },
    enabled: Boolean(query.id),
    onSuccess: (data) => {
      setNewTodo(data);
    },
  });

  const changeInputHandler = (event) => {
    const { name, value } = event.target;
    setNewTodo((pre) => ({ ...pre, [name]: value }));
  };

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:4000/todos/${id}`);
    },
    onSuccess: () => {
      push("/todos");
    },
  });

  const { mutate: updateTodo } = useMutation({
    mutationFn: async (payload) => {
      await axios.patch(`http://localhost:4000/todos/${payload.id}`, {
        title: payload.title,
        author: payload.author,
      });
    },
    onSuccess: () => {
      setIsEditMode(false);
      queryClient.invalidateQueries(["GET_TODO"]);
    },
  });

  return (
    <Container>
      {isEditMode ? (
        <>
          <div>
            <StInput
              type="text"
              value={newTodo.title}
              name="title"
              onChange={changeInputHandler}
            />
          </div>
          <div>
            <StInput
              type="text"
              value={newTodo.author}
              name="author"
              onChange={changeInputHandler}
            />
          </div>
        </>
      ) : (
        <>
          <h1>{todo?.title}</h1>
          <h2>{todo?.author}</h2>
        </>
      )}
      {isEditMode ? (
        <>
          <button
            onClick={() => {
              console.log(newTodo);
              updateTodo(newTodo);
            }}
          >
            완료
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              deleteTodo(query.id);
            }}
          >
            삭제
          </button>
          <button
            onClick={() => {
              setIsEditMode(!isEditMode); // 읽기 <-> 수정
            }}
          >
            수정
          </button>
        </>
      )}
    </Container>
  );
};

export default Todo;

const Container = styled.div``;
const StInput = styled.input`
  height: 40px;
`;
