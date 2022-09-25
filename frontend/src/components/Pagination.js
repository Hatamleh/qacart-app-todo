import styled from 'styled-components';
import React from 'react';

function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
}) {
  let pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalPosts / postsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  console.log(pageNumbers);

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => (
        <PaginationBlock key={number}>
          <a
            data-test-id="pagination-link"
            onClick={() => paginate(number)}>
            {number}
          </a>
        </PaginationBlock>
      ))}
    </PaginationContainer>
  );
}

export default Pagination;

const PaginationContainer = styled.ul`
  display: flex;
  position: absolute;
  bottom: 10px;
  flex-wrap: wrap;
`;

const PaginationBlock = styled.li`
  width: 30px;
  height: 30px;
  background-color: #171e26;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;
  cursor: pointer;
`;
