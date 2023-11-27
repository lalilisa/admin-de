import React, { Component, useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import '~/css/ListCategory.css'
import ReactPaginate from 'react-paginate'
import Switch from '@mui/material/Switch';
import EditCategory from './EditCategory'
import EditPackage from './EditPackage'


const CATEGORY_API_BASE_URL = "http://localhost:8085/api/v1/package"

const ListPackage = () => {
    console.log("PACKAGE")
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [packages, setPackages] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    var [actives, setActives] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [packagesEdit, setPackagesEdit] = useState(1);
    const fetchCategory = () => {
        axios.get(CATEGORY_API_BASE_URL, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            setPackages(res.data?.data)
            const endOffset = itemOffset + itemsPerPage;
            const currentItemsClone = packages.slice(itemOffset, endOffset);
            setActives(actives);
            setCurrentItems(currentItemsClone);
            currentItemsClone.forEach((row, index) => {
                actives[index] = row?.active;
            })
            setPageCount(Math.ceil(packages.length / itemsPerPage));
        })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchCategory();
    }, [packages.length, itemOffset, itemsPerPage, showEdit]);
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const editPackages = (packageId, active) => {
        axios.put(CATEGORY_API_BASE_URL + '/' + packageId, { active: active }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            console.log('res ', res);
        })
            .catch(err => {
                console.log("err :", err);
            })
    }
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % packages.length;
        setItemOffset(newOffset);
    };
    const handleEditPackage = (id) => {
        setPackagesEdit(id);
        setShowEdit(true);

    }
    const handleDeletePackages = (id) => {
        axios.delete(CATEGORY_API_BASE_URL + '/' + id, {
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
        setPackages(packages.filter(e => e.id !== id))
    }
    const toggleActive = (e, index, packageId) => {

        actives[index] = e.target.checked;
        setActives([...actives]);
        editPackages(packageId, e.target.checked);
    }

    const handlePopupedit = () => {
        setShowEdit(!showEdit);
    }
    const packageIdEdit = (id) => {
        setPackagesEdit(id);
    }
    const updateStatePackage = (packageUpadate) => {
        setPackages([...packageUpadate]);
    }
    return (
        <>
            <div className='pageCate'>
                <span className='titlePageCate'>Gói xem phim</span>
                <div className='BtnAdd'><Link to={`add`}><button className='btnAdd'>Thêm mới</button></Link></div>
                <div className='main'>
                    {
                        showEdit &&
                        <EditPackage packagess={packages} packageId={1} setShowEdit={handlePopupedit} setPackages={updateStatePackage} />
                    }
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Tên<nav></nav></th>
                                <th>Mã</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((row, index) => {
                                    return (
                                        <tr>
                                            <td>{row?.name}</td>
                                            <td>{row?.code}</td>
                                            <td>
                                                <Switch
                                                    checked={actives[index]}
                                                    onChange={(e) => { toggleActive(e, index, row?.id) }}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                                {/* <Switch onChange={(e)=>{toggleActive(e,row?.id)}} checked={actives[row?.id]}  /> */}
                                            </td>
                                            <td>
                                                <button style={{ border: 'none' }} onClick={() => { handleEditPackage(row?.id) }} ><i class="iconEdit fa-solid fa-pen-to-square"></i></button>
                                                <button style={{ border: 'none' }} onClick={() => { handleDeletePackages(row?.id) }}><i class="iconDelete fa-solid fa-trash-can"></i></button>
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

export default ListPackage;