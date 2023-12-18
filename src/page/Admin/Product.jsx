import React from 'react'
import {Routes, Route}from 'react-router-dom';
import Addproduct from '~/components/Admin/AddProduct'
import DeleteProduct from '~/components/Admin/DeleteProduct'
import EditProduct from '~/components/Admin/EditProduct'
import ListProduct from '~/components/Admin/ListProduct'
import Sidebar from '~/components/Admin/Sidebar'
import SubMovie from '~/components/Admin/SubMovie';

const Product = () => {
  return (
    <>
    <Sidebar/>
    <Routes>
    <Route path="/admin/product" element={<ListProduct/>}/>
    <Route path="/admin/product/add" element={<Addproduct/>}/>
    <Route path="/admin/product/edit/:id" element={<EditProduct/>}/>
    <Route path="/admin/product/delete/:id" element={<DeleteProduct/>}/>
    <Route path="/admin/product/submovie/:id" element={<SubMovie/>}/>
    <Route path="/admin/product/editsubmovie/:id" element={<ListProduct/>}/>
    <Route path="/admin/product/addsubmovie/:id" element={<ListProduct/>}/>
    <Route path="/admin/product/deletesubmovie/:id" element={<ListProduct/>}/>
    </Routes>
    </>
  )
}

export default Product