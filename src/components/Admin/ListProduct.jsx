import React, { Component, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import '~/css/ListCategory.css'
import ReactPaginate from 'react-paginate'
import Sidebar from './Sidebar'
import { Switch } from '@mui/material'

const PRODUCT_API_BASE_URL = "http://localhost:8085/api/v1/movies"

const ListProduct = () => {

const [products, setProducts] = useState([])
const [currentItems, setCurrentItems] = useState([]);
const [pageCount, setPageCount] = useState(0);
const [itemOffset, setItemOffset] = useState(0);
const itemsPerPage = 5;
var [actives, setActives] = useState([]);
const navigate = useNavigate();
useEffect(() => {
    axios.get(PRODUCT_API_BASE_URL + "/admin/all", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    }).then(res => {
        setProducts(res.data?.data)
        const endOffset = itemOffset + itemsPerPage;
        const currentItemsClone = products.slice(itemOffset, endOffset);
        setCurrentItems(currentItemsClone);
        currentItemsClone.forEach((row, index) => {
            actives[index] = row?.active;
        })
        setPageCount(Math.ceil(products.length / itemsPerPage));
        setActives(actives);
    })

}, [products.length, itemOffset, itemsPerPage]);

const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
};

const toggleActive = (e, index, packageId) => {

    actives[index] = e.target.checked;
    setActives([...actives]);
    // editPackages(packageId, e.target.checked);
}
const handleEditMovie = (movieId) => {
    navigate("/admin/product/edit/"+movieId);
}
const handleDeleteMovie = (movieId) => {
    axios.delete(PRODUCT_API_BASE_URL + '/' + movieId, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    }).then(res => {
        console.log('res ', res);
    })
        .catch(err => {
            console.log("err :", err);
        });
    setProducts(products.filter(e => e.id !== movieId))
}

return (
    <>

        <div className='pageCate'>
            <span className='titlePageCate'>Danh sách sản phẩm</span>
            <div className='BtnAdd'><Link to={`add`}><button className='btnAdd'>Thêm mới</button></Link></div>
            <div className='main'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên</th>
                            <th>Mã</th>
                            <th>Loại</th>
                            <th>Đánh giá</th>
                            <th>Tình trạng</th>
                            {/* <th>Còn</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((row, index) => {
                                return (
                                    <tr>
                                        <td>
                                            <img className='cateImg' src={row?.thumnail} alt="" /></td>
                                        <td>{row?.name}</td>
                                        <td>{row?.code}</td>
                                        <td>{row?.moviesType === 'MOVIES' ? 'Phim lẻ' : 'Phim bộ'}</td>
                                        <td>{row?.rate}</td>
                                        <td>
                                            <Switch
                                                checked={actives[index]}
                                                onChange={(e) => { toggleActive(e, index, row?.id) }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </td>
                                        <td>
                                            <button style={{ border: 'none' }} onClick={() => { handleEditMovie(row?.id) }} ><i class="iconEdit fa-solid fa-pen-to-square"></i></button>
                                            <button style={{ border: 'none' }} onClick={() => { handleDeleteMovie(row?.id) }}><i class="iconDelete fa-solid fa-trash-can"></i></button>
                                        </td>
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

export default ListProduct