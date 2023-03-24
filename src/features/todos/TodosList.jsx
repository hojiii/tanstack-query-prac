import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";

const TodosList = () => {
  const { push } = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["GET_TODOS"], // 이 요청에 대한 고유한 이름을 지어주어야 한다.
    queryFn: async () => {
      const data = await axios.get("http://localhost:4000/todos");
      return data.data;
    },
  });

  // 얼리 리턴
  if (!data || isLoading) return <div>로딩중....</div>;

  return (
    <>
      <button
        onClick={() => {
          push("/todos/add");
        }}
      >
        추가하기
      </button>
      <h1>Todo List</h1>
      <StContainer>
        {data.map((todo) => (
          <StTodo
            todo={todo}
            key={todo.id}
            onClick={() => {
              push(`/todos/${todo.id}`);
            }}
          >
            <div>{todo.id}</div>
            <div>{todo.title}</div>
          </StTodo>
        ))}
      </StContainer>
    </>
  );
};

export default TodosList;

const StContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StTodo = styled.div`
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
`;
