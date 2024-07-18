// postContext.js
import { createContext, useReducer } from "react";
import axios from "axios";

export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const SEARCH_POST = "SEARCH_POST";
export const FILTER_POST = "FILTER_POST";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case SEARCH_POST:
      return {
        ...state,
        posts: state.posts.filter((post) =>
          post.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case FILTER_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.group === action.payload),
      };
    default:
      return state;
  }
};

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [blog, dispatch] = useReducer(postReducer, initialState);

  const fetchPosts = async () => {
    dispatch({
      type: FETCH_POSTS_REQUEST,
    });
    try {
      const res = await axios.get("http://localhost:3000/users");
      const data = res.data;
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: FETCH_POSTS_ERROR,
        payload: err.message,
      });
    }
  };

  return (
    <PostContext.Provider value={{ blog, dispatch, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};
