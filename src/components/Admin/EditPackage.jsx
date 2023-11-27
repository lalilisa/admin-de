import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import noimage from '~/assets/imgs/noimage.jpg';
import Sidebar from './Sidebar';
import '~/css/AddCategory.css'
import { IoMdClose } from "react-icons/io";
const CATEGORY_API_BASE_URL = "http://localhost:8085/api/v1/package"

const EditPackage = ({ packagess, packageId, setShowEdit, setPackages }) => {

  const [packages, setPackage] = useState({})
  const [status, setStatus] = useState(undefined)
  const handleSubmit = (event) => {
    event.preventDefault();
    //  console.log(category)
    const formData = new FormData();
    formData.append("categoryName", packages.categoryName)
    formData.append("categoryImgFile", packages.categoryImgFile)
    formData.append("objName", packages.objName)

    axios.put(`${CATEGORY_API_BASE_URL}/${packageId}`,
      {
        name: packages.name,
        code: packages.code,
        price: packages.price,
        active: packages.active
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
      })
      .then((res) => {

        packagess?.forEach(element => {
          if (packageId === element?.id) {
            element.name = packages.name;
            element.code = packages.code;
            element.active = packages.active;
          }
        });
        setShowEdit();
        setPackages([...packagess]);
      })
      .catch((error) => {
        setStatus({ type: 'error', error })
        alert(error)
      })
  }



  useEffect(() => {
    axios.get(`${CATEGORY_API_BASE_URL}/${packageId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    ).then(res => {

      setPackage(res?.data?.data);
      console.log(packages);
    })
      .catch(err => {
        console.log(err);
      })
  }, []);
  const handleChange = (event) => {
    setPackage({
      ...packages,
      [event.target.name]: event.target.value
    })
  }
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
                <input type="text" className="form-control" id="categoryName" name="name" onChange={handleChange} value={packages.name} />
              </div>
              <div class="">
                <label style={{ marginBottom: "5px" }} htmlFor="objProduct">Mã</label>
                <input type="text" className="form-control" id="categoryCode" name="code" onChange={handleChange} value={packages.code} />
              </div>

              <div class="">
                <label style={{ marginBottom: "5px" }} htmlFor="objProduct">Giá</label>
                <input type="text" className="form-control" id="categoryPrice" name="price" onChange={handleChange} value={packages.price} />
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

export default EditPackage;