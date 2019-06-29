import React from "react";
import styled, { css } from "styled-components";

const Btn = styled.button`
  padding: 10px;
  background: none;
  cursor: pointer;
  transition: color 0.25s ease-in-out;
  transition: background 0.25s ease-in-out;

  ${props =>
    props.black &&
    css`
      background: #24292e;
      border: 1px solid white;
      color: white;
      &:hover {
        color: black;
        background: white;
      }
    `};

  ${props =>
    props.white &&
    css`
      background: white;
      border: 1px solid #24292e;
      color: black;
      &:hover {
        color: white;
        background: #24292e;
      }
    `};
`;

const Button = ({ children, ...props }) => <Btn {...props}>{children}</Btn>;

export default Button;
