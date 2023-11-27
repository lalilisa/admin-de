import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import noimage from '~/assets/imgs/noimage.jpg';
import Sidebar from './Sidebar';
import '~/css/AddCategory.css'
import { IoMdClose } from "react-icons/io";
const CATEGORY_API_BASE_URL = "http://localhost:8085/api/v1/category"

const EditCategory = ({ categories,categoryId, setShowEdit, setCategories }) => {

  const [category, setCategory] = useState({})

  let { id } = useParams();
  let navigative = useNavigate()
  const [image, setImage] = useState("")
  const [status, setStatus] = useState(undefined)
  const handleSubmit = (event) => {
    event.preventDefault();
    //  console.log(category)
    const formData = new FormData();
    formData.append("categoryName", category.categoryName)
    formData.append("categoryImgFile", category.categoryImgFile)
    formData.append("objName", category.objName)

    axios.put(`${CATEGORY_API_BASE_URL}/${categoryId}`,
      {
        name : category.name,
        code : category.code,
        active : category.active
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
      })
      .then((res) => {
        // setStatus({ type: 'success' })
        // alert("Lưu thành công")
        // document.getElementById("categoryName").value = ""
        // document.getElementById("objName").value = "--lựa chọn--"
        // setImage(noimage)
        // document.getElementById("categoryImgFile").value = ""
        // navigative("/admin/category")
        categories?.forEach(element => {
            if(categoryId === element?.id){
              element.name = category.name;
              element.code = category.code;
              element.active = category.active;
            }
        });
        setShowEdit();
        setCategories([...categories]);
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

  useEffect(() => {
    axios.get(`${CATEGORY_API_BASE_URL}/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    ).then(res => {
      console.log(res.data)
      setCategory(res.data?.data)

    })
      .catch(err => {
        console.log(err);
      })
  }, [])
  // const [showEdit,setShowEdit] = useState(true);
  return (
    <>

      <div className='pageCate' style={{ position: 'absolute', zIndex: 1000, left: '50%', transform: 'translate(-50%, -50%)', top: '30%' }}>
        <div className="BtnListCate">

          <h1 className='titlePageCate' ></h1>
          {/* <Link to={`/admin/category`}>
            <button className='btnListCate'>
            Danh sách danh mục
            </button>
          </Link> */}
          {/*  */}
        </div>

        <form className="formUploadImg" onSubmit={handleSubmit}>

          <div style={{ position: 'absolute', right: '5%', top: '15%' }}>
            <IoMdClose size={20} onClick={setShowEdit} style={{ hover: 'pointer' }} />
          </div>
          <div className="form-group">
            <div style={{ width: "100%", height: '200px' }}>
              <div class="">
                <label style={{ marginBottom: "5px" }} htmlFor="categoryName">Tên danh mục:</label>
                <input type="text" className="form-control" id="categoryName" name="categoryName" onChange={handleChangeCategoryName} value={category.name} />
              </div>
              <div class="">
                <label style={{ marginBottom: "5px" }} htmlFor="objProduct">Mã</label>
                <input type="text" className="form-control" id="categoryCode" name="categoryCode" onChange={handleChangeCategoryCode} value={category.code} />

                {/* <select className="form-control" value={category.name} id="objName" name="objName" onChange={handleChange}>
                  <option value=""> --Lựa chọn-- </option>
                  <option value="Nữ">Nữ</option>
                  <option value="Nam">Nam</option>
                </select> */}
              </div>
              <button className='btnUpload' style={{ width: '100%' }} type="submit">Cập nhật</button>
            </div>

            <div style={{ width: "45%" }} className="uploadImg">
              {/* <div className="cateImage">
            <img id="categoryImg" src={image===""?`${CATEGORY_API_BASE_URL}/images/${category.categoryImg}`: image} alt="" />
            </div>
            <div>
              <label style={{marginBottom:"5px"}} htmlFor="categoryImgFile">Ảnh danh mục sản phẩm:</label>
              <input type="file" className="form-control" onChange={imagesFileAsURl} id="categoryImgFile" name="categoryImgFile"/>
            </div> */}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditCategory