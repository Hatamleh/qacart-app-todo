import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { Checkbox, IconButton } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

const TodoItem = (props) => {
  const { user } = useContext(AuthContext);
  const [checked, setChecked] = useState(props.todo.isCompleted);

  const handleUpdate = () => {
    axios({
      method: "PUT",
      url: `/api/v1/tasks/${props.todo._id}`,
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
      data: {
        item: props.todo.item,
        isCompleted: !checked,
        userID: user.id,
      },
    }).then((res) => {
      setChecked(!checked);
    });
  };

  const handleDelete = () => {
    const id = props.todo._id;
    props.handleDelete(id);
  };

  return (
    <>
      <TodoItemContainer checked={checked} data-testid="todo-item">
        <Checkbox
          name="checked"
          onChange={handleUpdate}
          checked={checked}
          inputProps={{
            "data-testid": "complete-task",
          }}
        />
        <FormSubHeader data-testid="todo-text" checked={checked}>
          {props.todo.item}
        </FormSubHeader>
        <DeleteContainer>
          <IconButton data-testid="delete" aria-label="delete" onClick={handleDelete}>
            <DeleteForeverTwoToneIcon color="action" fontSize="small" />
          </IconButton>
        </DeleteContainer>
      </TodoItemContainer>
    </>
  );
};

export default TodoItem;

const FormSubHeader = styled.h2`
  color: rgb(145, 158, 171);
  line-height: 1.43;
  font-size: 0.875rem;
  margin: 1rem 0;
  text-decoration: ${(props) => (props.checked ? " line-through" : null)};
`;

const TodoItemContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.checked ? "#214C61" : "#3f51b5")};
  border-radius: 16px;
  padding: 5px 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
  &:last-of-type {
    margin-bottom: 100px;
  }
`;

const DeleteContainer = styled.div`
  margin-left: auto;
`;
