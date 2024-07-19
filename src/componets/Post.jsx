import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  PostContext,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  SEARCH_POST,
} from "../context/postContext";
import "../componets/Post.css";
import StyledPost, {
  StyledDelete,
  StyledEdit,
  StyledSave,
  StyledSaves,
  StyledSearch,
  StyledSelect,
} from "./StyledPost";

const Post = () => {
  const {
    blog: { posts },
    dispatch,
  } = useContext(PostContext);

  const [searchInput, setSearchInput] = useState("");
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    group: "",
  });
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [editFormData, setEditFormData] = useState({
    name: "",
    username: "",
    group: "",
  });
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
    setEditId(null);
    setEditFormData({
      name: "",
      username: "",
      group: "",
    });
  };

  const handleShow = () => setShow(true);

  const fetchPosts = async () => {
    dispatch({
      type: FETCH_POSTS_REQUEST,
    });
    try {
      const res = await axios.get("http://localhost:3000/users");
      let data = res.data;
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: FETCH_POSTS_ERROR,
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${postId}`);
        dispatch({ type: DELETE_POST, payload: postId });
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch({ type: SEARCH_POST, payload: searchInput });
  };

  let filteredPosts = posts;
  if (searchInput !== "") {
    filteredPosts = posts.filter((post) =>
      post.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  if (selectedGroup !== "All") {
    filteredPosts = filteredPosts.filter(
      (post) => post.group === selectedGroup
    );
  }

  let list = filteredPosts.map((el) => (
    <tr key={el.id}>
      <td className="td">{el.name}</td>
      <td className="td">{el.username}</td>
      <td className="td">{el.group}</td>
      <td className="td">
        <StyledEdit className="Edit" onClick={() => handleEdit(el)}>
          ✍️
        </StyledEdit>
        <StyledDelete
          className="Delete"
          onClick={() => handleDeletePost(el.id)}
        >
          🗑️
        </StyledDelete>
      </td>
    </tr>
  ));

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      name: formData.name,
      username: formData.username,
      group: formData.group,
    };
    axios
      .post("http://localhost:3000/users", user)
      .then((res) => dispatch({ type: ADD_POST, payload: res.data }))
      .catch((error) => console.error("Error adding post:", error));
    setFormData({ name: "", username: "", group: "" });
    handleClose();
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setEditFormData({
      name: post.name,
      username: post.username,
      group: post.group,
    });
    setIsEditing(true);
    handleShow();
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevEditFormData) => ({
      ...prevEditFormData,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let updatedPost = {
      name: editFormData.name,
      username: editFormData.username,
      group: editFormData.group,
    };
    axios
      .put(`http://localhost:3000/users/${editId}`, updatedPost)
      .then((res) => {
        dispatch({ type: EDIT_POST, payload: res.data });
        handleClose();
      })
      .catch((error) => console.error("Error editing post:", error));
  };

  return (
    <div className="All">
      <div className="container">
        <div className="all">
          <div className="start">
            <StyledSearch
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <StyledSelect
              name="group"
              id="group"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="All">All</option>
              <option value="N58">N58</option>
              <option value="N59">N59</option>
              <option value="N52">N52</option>
              <option value="N50">N50</option>
            </StyledSelect>

            <StyledPost variant="primary" onClick={handleShow}>
              Add
            </StyledPost>
          </div>
          <table className="tableALLL">
            <thead>
              <tr>
                <th className="th">FIRST NAME</th>
                <th className="th">LAST NAME</th>
                <th className="th">GROUP</th>
                <th className="th">ACTIONS</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={isEditing ? editFormData.name : formData.name}
                onChange={isEditing ? handleEditFormChange : handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={isEditing ? editFormData.username : formData.username}
                onChange={isEditing ? handleEditFormChange : handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicGroup">
              <Form.Label>Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group"
                name="group"
                value={isEditing ? editFormData.group : formData.group}
                onChange={isEditing ? handleEditFormChange : handleFormChange}
              />
            </Form.Group>
            <Modal.Footer className="btn-allss">
              <StyledSaves onClick={handleClose}>Close</StyledSaves>
              <StyledSave type="submit">
                {isEditing ? "Save Changes" : "Save"}
              </StyledSave>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Post;
