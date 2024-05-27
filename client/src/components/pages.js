import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Pagination from "react-bootstrap/Pagination";

const Pages = observer(() => {
    const {item} = useContext(Context)
    const pageCount = Math.ceil(item.totalCount / item.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3" style={{}}>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={item.page === page}
                    activeLabel=''
                    onClick={() => item.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;