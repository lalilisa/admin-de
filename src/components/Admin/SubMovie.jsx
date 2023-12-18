import React, { Component, useEffect, useState } from 'react'
import axios from "axios"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '~/css/ListCategory.css'
import ReactPaginate from 'react-paginate'
import Sidebar from './Sidebar'
import { Switch } from '@mui/material'

const SUB_MOVIE_API_BASE_URL = "http://localhost:8085/api/v1/movies/submovie/"

const SubMovie = () => {

    const [products, setProducts] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    var [actives, setActives] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();

    useEffect(() => {
        axios.get(SUB_MOVIE_API_BASE_URL + id, {
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

    const toggleActive = (e, index, movieId) => {

        actives[index] = e.target.checked;
        setActives([...actives]);
        axios.put(SUB_MOVIE_API_BASE_URL + 'active/' + movieId, { active: actives[index] ? 1 : 0 }, {
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
    }
    const handleEditMovie = (movieId) => {
        navigate("/admin/product/edit/" + movieId);
    }
    const handleDeleteSubMovie = (movieId) => {
        axios.delete(SUB_MOVIE_API_BASE_URL + '/' + movieId, {
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
                                <th>Tên phim</th>
                                <th>Tên tập</th>
                                <th>Tập</th>
                                <th>Ngày công bố</th>
                                <th>Tình trạng</th>
                                <th></th>
                                {/* <th>Còn</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((row, index) => {
                                    return (
                                        <tr>
                                            {/* <td>
                                                <img className='cateImg' src={row?.thumnail} alt="" /></td> */}
                                            <td>{state?.name}</td>
                                            <td>{row?.name}</td>
                                            <td>{row?.episode}</td>
                                            <td>{row?.publicDate}</td>

                                            <td>
                                                <Switch
                                                    checked={actives[index]}
                                                    onChange={(e) => { toggleActive(e, index, row?.id) }}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </td>
                                            <td>
                                                {/* <button style={{ border: 'none' }} onClick={() => { viewSubMovie(row?.id) }}><i class="iconList fa-solid fa-list"></i></button> */}
                                                <button style={{ border: 'none' }} onClick={() => { handleEditMovie(row?.id) }} ><i class="iconEdit fa-solid fa-pen-to-square"></i></button>
                                                <button style={{ border: 'none' }} onClick={() => { handleDeleteSubMovie(row?.id) }}><i class="iconDelete fa-solid fa-trash-can"></i></button>
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

export default SubMovie;