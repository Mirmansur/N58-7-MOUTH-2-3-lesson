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
  FILTER_POST,
} from "../context/postContext";
import "../componets/Post.css";
import StyledPost, {
  StyledDelete,
  StyledEdit,
  StyledSave,
  StyledSaves,
  StyledSearch,
  StyledSelect,
} from "../componets/StyledPost";

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

  const handleClose = () => setShow(false);
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
    confirm("Rostanam o'chirishni hohlaysizmi");
    try {
      await axios.delete(`http://localhost:3000/users/${postId}`);
      dispatch({ type: DELETE_POST, payload: postId });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch({ type: SEARCH_POST, payload: searchInput });
  };

  let filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // const handleFilter = () => {
  //   dispatch({ type: FILTER_POST, payload: filterInput });
  // };

  // let filteredPosts = posts.filter((post) =>
  //   post.group.toLowerCase().includes(filterInput.toLowerCase())
  // );

  let list = filteredPosts.map((el) => (
    <tr key={el.id}>
      <td className="td">{el.name}</td>
      <td className="td">{el.username}</td>
      <td className="td">{el.group}</td>
      <td className="td">
        <StyledEdit className="Edit" onClick={() => handleEditPost(el.id)}>
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

  const hsndelSubmit = (e) => {
    e.preventDefault();
    let user = {
      name: formData.name,
      username: formData.username,
      group: formData.group,
    };
    axios
      .post("http://localhost:3000/users", user)
      .then((res) => dispatch({ type: ADD_POST, payload: res.data }));
    setFormData(" ");
    const handleEditPost = (postId) => {
      dispatch({ type: EDIT_POST, payload: postId });
    };
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
            <StyledSelect name="" id="">
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
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={hsndelSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group"
                name="group"
                value={formData.group}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Modal.Footer className="btn-allss">
              <StyledSaves onClick={handleClose}>Close</StyledSaves>
              <StyledSave onClick={handleClose}>Save </StyledSave>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Post;
