import styled from "styled-components";

const StyledPost = styled.button`
  font-family: Mulish;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
`;

export default StyledPost;

const StyledDelete = styled.button`
  font-family: Mulish;
  color: white;
  padding: 7px 16px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  margin-left: 15px;
  margin-top: 10px;
  transition: 0.4s;
  &:hover {
    background-color: #8c0707;
    color: white;
  }
`;

export { StyledPost, StyledDelete };

const StyledEdit = styled.button`
  font-family: Mulish;
  /* background-color: #ba940a; */
  color: white;
  padding: 7px 16px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  margin-left: 15px;
  margin-top: -10px;
  transition: 0.4s;
  color: #120e0e;
  &:hover {
    background-color: #6c6c6c;
  }
`;

export { StyledEdit };

const StyledSearch = styled.input`
  font-family: Mulish;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 12px;
  margin-right: 10px;
  width: 80% !important;
  outline: none !important;
  transition: 0.4s;
  &:hover {
    border: 1.3px solid #4caf50;
  }
`;

export { StyledSearch };

const StyledSelect = styled.select`
  font-family: Mulish;
  background-color: transparent;
  color: black;
  border-radius: 8px;
  outline: none;
  padding: 10px;
  cursor: pointer;
`;

export { StyledSelect };

const StyledSave = styled.button`
  font-family: Mulish;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 12px;

  transition: 0.4s;
  &:hover {
    background-color: #ff0000;
    color: white;
  }
`;

export { StyledSave };

const StyledSaves = styled.button`
  font-family: Mulish;
  background-color: #2f2fa8;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  transition: 0.4s;
  &:hover {
    background-color: #f10000;
    color: white;
  }
`;

export { StyledSaves };
