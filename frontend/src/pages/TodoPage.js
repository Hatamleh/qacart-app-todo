import styled from "styled-components";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../Theme/theme";
import { Container, IconButton } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import TodoItem from "../components/Todo/TodoItem";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet";

const LoginContainer = styled.div`
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const LoginFormContainer = styled.div`
   padding: 32px;
   display: flex;
   flex-direction: column;
   background-color: #222c36;
   border-radius: 16px;
   box-shadow: rgb(0 0 0 / 70%) 0px 0px 1px 0px,
      rgb(0 0 0 / 50%) 0px 3px 4px -2px;
   width: 522px;
   min-height: 522px;
   position: relative;
`;

const CreateNewTodoContainer = styled.div`
   margin-left: auto;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   margin: 10px 0;
`;

const FormHeader = styled.h2`
   font-size: 2rem;
   text-transform: uppercase;
`;

const FormSubHeader = styled.h2`
   color: rgb(145, 158, 171);
   line-height: 1.43;
   font-size: 0.875rem;
   margin: 1rem 0;
`;

const getWelcome = () => {
   const currentHour = new Date().getHours();

   if (currentHour >= 0 && currentHour <= 5) {
      return "Time to sleep";
   }
   if (currentHour > 5 && currentHour <= 12) {
      return "Good morning";
   }

   if (currentHour > 12 && currentHour <= 17) {
      return "Good afternoon";
   }

   if (currentHour > 17) {
      return "Good Evening";
   }
};

const getName = (name) => {
   if (!name || name.length < 2 || name.includes("@") || name.includes(".")) {
      return "User";
   } else {
      return name;
   }
};

function TodoPage() {
   const [todos, setTodos] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(5);
   const history = useHistory();
   const { user } = useContext(AuthContext);

   useEffect(() => {
      axios({
         method: "GET",
         url: `/api/v1/tasks`,
         headers: {
            Authorization: `Bearer ${user.access_token}`,
         },
      })
         .then((res) => {
            console.log(res.data.tasks.sort().reverse());
            setTodos(res.data.tasks);
         })
         .catch((err) => {
            console.log(err.response);
         });
   }, [user.access_token]);

   const handleDelete = (id) => {
      axios({
         method: "Delete",
         url: `/api/v1/tasks/${id}`,
         headers: {
            Authorization: `Bearer ${user.access_token}`,
         },
      }).then((res) => {
         const newTodos = todos.filter((todo) => todo._id !== id);
         setTodos(newTodos);
      });
   };

   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentTodos = todos.slice(indexOfFirstPost, indexOfLastPost);

   const paginate = (number) => setCurrentPage(number);

   return (
      <ThemeProvider theme={theme}>
         <Container maxWidth="md">
            <Helmet>
               <title>QAcart Todo App - Todos page</title>
            </Helmet>
            <LoginContainer>
               <LoginFormContainer>
                  <FormHeader data-testid="welcome">{`${getWelcome()} ${getName(
                     user.firstName,
                  )}`}</FormHeader>
                  <CreateNewTodoContainer>
                     <IconButton
                        aria-label="delete"
                        onClick={() => history.push("/todo/new")}
                     >
                        <AddIcon
                           color="action"
                           fontSize="small"
                           data-testid="add"
                        />
                     </IconButton>
                     <FormSubHeader>Add a new Todo</FormSubHeader>
                  </CreateNewTodoContainer>
                  {currentTodos.map((todo) => (
                     <TodoItem
                        key={todo._id}
                        todo={todo}
                        updateTodo={setTodos}
                        handleDelete={handleDelete}
                     />
                  ))}
                  {!currentTodos.length && (
                     <h4 data-testid="no-todos">No Available Todos</h4>
                  )}
                  {todos.length > postsPerPage && (
                     <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={todos.length}
                        paginate={paginate}
                     />
                  )}
               </LoginFormContainer>
            </LoginContainer>
         </Container>
      </ThemeProvider>
   );
}

export default TodoPage;
