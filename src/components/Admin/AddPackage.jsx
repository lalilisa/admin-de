import axios from "axios"
import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import noimage from '~/assets/imgs/noimage.jpg';
import '~/css/AddCategory.css'
import Sidebar from "./Sidebar";
import { Switch } from "@mui/material";
const CATEGORY_API_BASE_URL = "http://localhost:9000/admin/category"
const PRODUCT_API_BASE_URL = "http://localhost:8085/api/v1/package"

const AddPackage = () => {

  const [categories, setCategories] = useState([])
  const [packages, setPackage] = useState({})
  let navigative = useNavigate()
  const [image, setImage] = useState(noimage)
  const [status, setStatus] = useState(undefined)
  const [cateSelect, setCateSelect] = useState([])
  const [active, setActive] = useState(false)
  useEffect(() => {
    axios.get(CATEGORY_API_BASE_URL).then(res => {
      setCategories(res.data);
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {...packages, active : active};
    console.log('data ',data);
    axios.post(PRODUCT_API_BASE_URL,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
      })
      .then(() => {
        setStatus({ type: 'success' })
        navigative("/admin/package")
        alert("Lưu thành công")
      })
      .catch((error) => {
        setStatus({ type: 'error', error })
        alert("Không thành công")
      })
  }


  const handleChange = (event) => {
    setPackage({
      ...packages,
      [event.target.name]: event.target.value
    })
  }

  const handleSelect = (event) => {
    let array = []
    categories.map((item, index) => {
      if (item.objName === event.target.value) {
        array.push(item)
      }
    })
    setCateSelect(array)
    document.getElementById("categoryName").value = ""
  }


  const imagesFileAsURl = (fileSelected) => {
    if (fileSelected.target.files && fileSelected.target.files.length > 0) {
      setImage(URL.createObjectURL(fileSelected.target.files[0]));
    }
    setPackage({
      ...packages,
      [fileSelected.target.name]: fileSelected.target.files[0]
    })
  }
  const handleChangeName = (event) => {
    packages.name = event.target.value
    setPackage({
      ...packages
    })
  }

  const createPackage = ()=>{

  }
  const handleChangeCode = (event) => {
    packages.code = event.target.value
    setPackage({
      ...packages
    })
  }
  return (
    <>

      <div className='pageCate'>
        <div className="BtnListCate">
          <h1 className='titlePageCate' >Thêm sản phẩm</h1>
          <Link to={`/admin/product`}>
            <button className='btnListCate'>
              Danh sách sản phẩm
            </button>
          </Link>
        </div>
        <form className="formUploadImg" onSubmit={handleSubmit} style={{ width: "40%" }}>
          <div className="formGroup" style={{ width: "100%",margin : 'auto' }}>
            <div style={{ width: "100%" }}>
              <div class="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="productName">Tên Gói:</label>
                <input type="text" className="form-control" id="productName" name="name" onChange={handleChange} />
              </div>
              <div class="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="productName">Mã gói:</label>
                <input type="text" className="form-control" id="productName" name="code" onChange={handleChange} />
              </div>

              <div class="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="productName">Giá</label>
                <input type="text" className="form-control" id="price" name="price" onChange={handleChange} />
              </div>

              {/* <div class="form-group">
              <label style={{marginBottom:"5px"}} htmlFor="productName">Sản phẩm có sẵn:</label>
              <input type="number" className="form-control" id="stockQuantity" name="stockQuantity" onChange={handleChange}/>
             </div> */}
              <div className="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="objProduct">Trạng thái</label>
                <Switch
                  checked={active}
                  onChange={(e) => { setActive(e.target.checked) }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <button onClick={(e)=>{handleSubmit(e)}} className='btnUpload' type="submit" style={{margin : '0 auto' , display : 'block'}}> Thêm mới</button>
            </div>

            {/* <div style={{ width: "45%" }} className="uploadImg">
              <div className="cateImage">
                <img id="categoryImg" src={image} alt="" />
              </div>
              <div>
                <label style={{ marginBottom: "5px" }} htmlFor="imgProductFile">Ảnh sản phẩm:</label>
                <input type="file" className="form-control" onChange={imagesFileAsURl} id="imgProductFile" name="imgProductFile" />
              </div>

            </div> */}
          </div>
        </form>
      </div>
    </>
  )
}

export default AddPackage;