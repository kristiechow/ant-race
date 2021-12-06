import styled from "styled-components";

export const StyledButton = styled.button`
  width: 20vw;
  height: 12vh;
  border-radius: 6px;
  border: 10px;
  text-align: center;
  padding: 15px;
  background-color: ${(props) => (props.primary ? "#fd8e7b" : "#f3d04e")};
  color: #ffffff;
  font-family: "Archivo", sans-serif;
  font-weight: 600;
  margin: 32, 47, 11, 47;
  font-size: 2vw;
  line-height: 30px;
  align-items: center;
`;
