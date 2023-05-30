import { createApi } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";

async function baseQuery({
  url,
  method,
  body,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}) {
  // get user data from local storage or from Redux state
  const userData = JSON.parse(localStorage.getItem("userData")!);
  const headers: HeadersInit = new Headers();

  if (userData) {
    headers.set("Key", userData.key);

    // calculate sign header
    const signString = `${method}+${url}+${JSON.stringify(body) || ""}+${
      userData.secret
    }`;
    const sign = CryptoJS.MD5(signString).toString();

    headers.set("Sign", sign);
  }

  const response = await fetch(`https://no23.lavina.tech${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  return { data };
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
    }),
    updateBook: builder.mutation({
      query: (book) => ({
        url: `/books/${book.id}`,
        method: "PUT",
        body: book,
      }),
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
    }),
    getBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} = apiSlice;
