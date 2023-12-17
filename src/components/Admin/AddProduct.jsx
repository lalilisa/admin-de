import axios from "axios"
import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import noimage from '~/assets/imgs/noimage.jpg';
import '~/css/AddCategory.css'
import Sidebar from "./Sidebar";
import MultipleSelectChip from "./ChipSelection";
import { Switch } from "@mui/material";
const CATEGORY_API_BASE_URL = "http://localhost:8085/api/v1/category/"
const PRODUCT_API_BASE_URL = "http://localhost:8085/api/v1/movies"

const Addproduct = () => {

  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({})
  let navigative = useNavigate()
  const [image, setImage] = useState(noimage)
  const [status, setStatus] = useState(undefined)
  const [cateSelect, setCateSelect] = useState([])
  const [active, setActive] = useState(false)
  useEffect(() => {
      fetchCategory();
  }, []);
  const fetchCategory = () => {
    axios.get(CATEGORY_API_BASE_URL + "admin", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).then(res => {
      setCategories(res.data?.data)
    })
      .catch(err => {
        console.log(err);
      })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(product)
    const formData = new FormData();
    formData.append("name", product?.name)
    formData.append("code", product?.code)
    formData.append("thumnail", product?.imgProductFile)
    formData.append("description", product?.description)
    formData.append("type", product?.type)
    formData.append("duration", product?.duration);
    formData.append("active", active ? 1 : 0)
    formData.append("categoriesIds", cateSelect.map(e=>e?.id))
    console.log('create:',product)
    // formData.append("stockQuantity",product.stockQuantity)
    axios.post(PRODUCT_API_BASE_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
      })
      .then(() => {
        setStatus({ type: 'success' })
        navigative("/admin/product")
        alert("Lưu thành công")
      })
      .catch((error) => {
        setStatus({ type: 'error', error })
        alert("Không thành công")
      })
  }


  const handleChange = (event) => {
    setProduct({
      ...product,
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
    setProduct({
      ...product,
      [fileSelected.target.name]: fileSelected.target.files[0]
    })
  }

  return (
    <>

      <div className='pageCate'>
        <div className="BtnListCate">
          <h1 className='titlePageCate' >Thêm phim</h1>
          <Link to={`/admin/product`}>
            <button className='btnListCate'>
              Danh sách phim
            </button>
          </Link>
        </div>
        <form className="formUploadImg" onSubmit={handleSubmit}>
          <div className="formGroup">
            <div style={{ width: "35%" }}>
              <div class="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="productName">Tên phim:</label>
                <input type="text" className="form-control" id="productName" name="name" onChange={handleChange} />
              </div>

              <div class="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="productName">Mã phim:</label>
                <input type="text" className="form-control" id="price" name="code" onChange={handleChange} />
              </div>
              <div class="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="objProduct">Loại phim:</label>
                <select className="form-control" id="objName" name="type" onChange={handleChange}>
                  <option value=""> --Lựa chọn-- </option>
                  <option value="MOVIES">Phim lẻ</option>
                  <option value="SERIES">Phim bộ</option>
                </select>
              </div>
              <div class="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="productName">Thời lượng:</label>
                <input type="text" className="form-control" id="price" name="duration" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="objProduct">Trạng thái</label>
                <Switch
                  checked={active}
                  onChange={(e) => { setActive(e.target.checked) }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              {/* <div class="form-group">
              <label style={{marginBottom:"5px"}} htmlFor="productName">Sản phẩm có sẵn:</label>
              <input type="number" className="form-control" id="stockQuantity" name="stockQuantity" onChange={handleChange}/>
             </div> */}

              <div class="form-group">
                <label style={{ marginBottom: "5px" }} htmlFor="productName">Mô tả:</label>
                <textarea className="form-control" id="moTa" name="description" onChange={handleChange}></textarea>
              </div>


            </div>
            <div style={{ width: "45%" }} className="uploadImg">
              <div className="cateImage">
                <img id="categoryImg" src={image} alt="" />
              </div>
              <div>
                <label style={{ marginBottom: "5px" }} htmlFor="thumnail">Ảnh sản phẩm:</label>
                <input type="file" className="form-control" onChange={imagesFileAsURl} id="thumnail" name="thumnail" />
              </div>
              <div>
                <label style={{ marginBottom: "5px", marginTop: '10px' }} htmlFor="categoryName">Danh mục:</label>
                <MultipleSelectChip data={categories} setCategories={setCateSelect} />
              </div>
              <button className='btnUpload' type="submit">Thêm mới</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Addproduct