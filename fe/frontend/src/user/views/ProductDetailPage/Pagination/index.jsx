import React from 'react';
import Pagination from './Pagination.jsx';

const PaginationWrapper = ({ current, total, onChange }) => {
    return <Pagination current={current} total={total} onChange={onChange} />;
};

export default PaginationWrapper;
