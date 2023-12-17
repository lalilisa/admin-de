import axios from "axios"
import React, { Component, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import noimage from '~/assets/imgs/noimage.jpg';
import Sidebar from "./Sidebar";
import '~/css/AddCategory.css'
import { Switch } from "@mui/material";
const CATEGORY_API_BASE_URL = "http://localhost:8085/api/v1/category/"

const AddCategory = () => {


  const [category, setCategory] = useState({
    categoryName: '',
    categoryImgFile: '',
    objName: ''
  })
  let navigative = useNavigate()
  const [image, setImage] = useState(noimage)
  const [status, setStatus] = useState(undefined)
  const [active, setActive] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(category)
    const formData = new FormData();
    formData.append("categoryName", category.categoryName)
    formData.append("categoryImgFile", category.categoryImgFile)
    formData.append("objName", category.objName)
    axios.post(`${CATEGORY_API_BASE_URL}`,
    {
      name : category.name,
      code : category.code,
      active : active
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      },
    })
    .then((res) => {

    })
    .catch((error) => {
      setStatus({ type: 'error', error })
      alert(error)
    })
  }

  const handleChangeCategoryName = (event) => {
    category.name = event.target.value
    setCategory({
      ...category
    })
  }


  const handleChangeCategoryCode = (event) => {
    category.code = event.target.value
    setCategory({
      ...category
    })
  }

  const imagesFileAsURl = (fileSelected) => {
    if (fileSelected.target.files && fileSelected.target.files.length > 0) {
      setImage(URL.createObjectURL(fileSelected.target.files[0]));
    }
    setCategory({
      ...category,
      [fileSelected.target.name]: fileSelected.target.files[0]
    })
  }

  return (
    <div className='pageCate'>
      <div className="BtnListCate">
        <h1 className='titlePageCate' >Thêm danh mục sản phẩm</h1>
        <Link to={`/admin/category`}>
          <button className='btnListCate'>
            Danh sách danh mục
          </button>
        </Link>
      </div>
      <form className="formUploadImg" onSubmit={handleSubmit}>
        <div className="formGroup"  >
          <div style={{ width: "35%" }}>
            <div className="form-group">
              <label style={{ marginBottom: "5px" }} htmlFor="categoryName">Tên thể loại:</label>
              <input type="text" className="form-control" id="categoryName" name="categoryName" onChange={handleChangeCategoryName} />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "5px" }} htmlFor="categoryName">Mã thể loại:</label>
              <input type="text" className="form-control" id="categoryName" name="categoryName" onChange={handleChangeCategoryCode} />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "5px" }} htmlFor="objProduct">Trạng thái</label>
              <Switch
                checked={active}
                onChange={(e) => { setActive(e.target.checked) }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>
          </div>
          <div style={{ width: "35%" }} className="uploadImg">
            {/* <div className="cateImage">
            <img id="categoryImg" src={image} alt="" />
            </div>
            <div>
              <label style={{marginBottom:"5px"}} htmlFor="categoryImgFile">Ảnh danh mục sản phẩm:</label>
              <input type="file" className="form-control" onChange={imagesFileAsURl} id="categoryImgFile" name="categoryImgFile"  />
            </div> */}
            <button className='btnUpload' type="submit">Thêm mới</button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default AddCategory