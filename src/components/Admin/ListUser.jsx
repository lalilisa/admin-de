import React, { Component, useEffect, useState } from 'react'
import axios from "axios"
import '~/css/ListCategory.css'
import ReactPaginate from 'react-paginate'
import Sidebar from './Sidebar'
import Switch from '@mui/material/Switch';
const USER_API_BASE_URL = "http://localhost:8085/api/user/list-user"

const ListUser = () => {

    const [users, setUsers] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    var [actives, setActives] = useState([]);
    useEffect(() => {
        axios.get(USER_API_BASE_URL,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
        ).then(res => {
            setUsers(res.data)
            console.log(res.data)
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(users.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(users.length / itemsPerPage));
        })

    }, [users.length, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    const toggleActive = (e, index, userId) => {

        actives[index] = e.target.checked;
        setActives([...actives]);
    }

    return (
        <>

            <div className='pageCate'>
                <span className='titlePageCate'>Danh sách khách hàng</span>
                <div className='main'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Tên tài khoản</th>
                                <th>Họ tên</th>
                                <th>Biệt danh</th>
                                <th>Quyền</th>
                                <th>Thành viên từ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((row, index) => {
                                    return (
                                        <tr>
                                            <td>{row.username}</td>
                                            <td>{row.fullname}</td>
                                            <td>{row.nickName}</td>
                                            <td>
                                                {row?.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}
                                            </td>
                                            <td>{new Date(row?.createdAt).toLocaleDateString('en-GB')}</td>
                                        </tr>
                                    )
                                }

                                )

                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="sau >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< trước"
                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="activePage"
                        renderOnZeroPageCount={null}
                    />
                </div>

            </div>
        </>

    )
}

export default ListUser