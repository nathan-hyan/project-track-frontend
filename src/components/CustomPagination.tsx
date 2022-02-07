import { Product } from 'interfaces/product';
import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { setPage } from 'utils/paginationUtils';

interface Props {
  items: Product[];
  onChangePage: (items: Product[]) => void;
}

interface State {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  pages: number[];
  pageSize: number;
  startPage: number;
  endPage: number;
}

export default function CustomPagination({ items, onChangePage }: Props) {
  const [state, setState] = useState<State>({
    totalPages: 0,
    startIndex: 0,
    endIndex: 0,
    currentPage: 1,
    pages: [],
    pageSize: 0,
    startPage: 0,
    endPage: 0,
  });

  const changePage = (page: number) => {
    const { totalPages } = state;
    const pager = setPage(items, page);

    if (page < 1 || page > totalPages) return;

    setState(pager.newState);
    onChangePage(pager.items);
  };

  useEffect(() => {
    const pager = setPage(items);
    setState(pager.newState);
    onChangePage(pager.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <Pagination className="d-flex justify-content-center mt-3">
      <Pagination.First
        onClick={() => changePage(1)}
        disabled={state.currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => changePage(state.currentPage - 1)}
        disabled={state.currentPage === 1}
      />
      {state.pages.map((page) => (
        <Pagination.Item
          active={state.currentPage === page}
          onClick={() => changePage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={state.currentPage === state.totalPages}
        onClick={() => changePage(state.currentPage + 1)}
      />
      <Pagination.Last
        disabled={state.currentPage === state.totalPages}
        onClick={() => changePage(state.totalPages)}
      />
    </Pagination>
  );
}
