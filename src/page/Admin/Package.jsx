import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AddPackage from '~/components/Admin/AddPackage';
import EditPackage from '~/components/Admin/EditPackage';
import ListPackage from '~/components/Admin/ListPackage';
import ListUser from '~/components/Admin/ListUser'
import Sidebar from '~/components/Admin/Sidebar';

const Package = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/admin/package/add" element={<AddPackage />} />
        <Route path="/admin/package/edit/:id" element={<EditPackage />} />
        <Route path="/admin/package" element={<ListPackage />} />
      </Routes>
    </>
  )
}

export default Package;