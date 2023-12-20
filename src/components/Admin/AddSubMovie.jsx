import axios from "axios"
import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import noimage from '~/assets/imgs/noimage.jpg';
import '~/css/AddCategory.css'
import { Switch } from "@mui/material";
const SUBMOVIE_API_BASE_URL = "http://localhost:8085/api/v1/movies/submovie"

const AddSubMovie = () => {

    const [subMovie, setsubMovie] = useState({})
    let navigative = useNavigate()
    const [image, setImage] = useState(noimage)
    const { id } = useParams();
    const [active, setActive] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(subMovie)
        const formData = new FormData();
        formData.append("name", subMovie?.name)
        formData.append("file", subMovie?.thumnail)
        formData.append("active", active ? 1 : 0)
        formData.append("episode", subMovie?.episode)
        formData.append("movieId", id)
        console.log('create:', subMovie)
        // formData.append("stockQuantity",subMovie.stockQuantity)
        axios.post(SUBMOVIE_API_BASE_URL,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
            })
            .then(() => {
  
                navigative("/admin/product/subMovie/"+id)
                alert("Lưu thành công")
            })
            .catch((error) => {

                alert("Không thành công")
            })
    }


    const handleChange = (event) => {
        setsubMovie({
            ...subMovie,
            [event.target.name]: event.target.value
        })
    }
    const imagesFileAsURl = (fileSelected) => {
        if (fileSelected.target.files && fileSelected.target.files.length > 0) {
            setImage(URL.createObjectURL(fileSelected.target.files[0]));
        }
        setsubMovie({
            ...subMovie,
            [fileSelected.target.name]: fileSelected.target.files[0]
        })
    }

    return (
        <>

            <div className='pageCate'>
                <div className="BtnListCate">
                    <h1 className='titlePageCate' >Thêm tập phim</h1>
                    <Link to={`/admin/product/submovie/${id}`}>
                        <button className='btnListCate'>
                            Danh sách tập phim
                        </button>
                    </Link>
                </div>
                <form className="formUploadImg" onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <div style={{ width: "35%" }}>
                            <div class="form-group">
                                <label style={{ marginBottom: "5px" }} htmlFor="subMovieName">Tên tập phim:</label>
                                <input type="text" className="form-control" id="subMovieName" name="name" onChange={handleChange} />
                            </div>

                            <div class="form-group">
                                <label style={{ marginBottom: "5px" }} htmlFor="subMovieName">Tập:</label>
                                <input type="text" className="form-control" id="price" name="episode" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label style={{ marginBottom: "5px" }} htmlFor="objsubMovie">Trạng thái</label>
                                <Switch
                                    checked={active}
                                    onChange={(e) => { setActive(e.target.checked) }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </div>
                        <div style={{ width: "45%" }} className="uploadImg">
                            <div className="cateImage">
                                <img id="categoryImg" src={image} alt="" />
                            </div>
                            <div>
                                <label style={{ marginBottom: "5px" }} htmlFor="thumnail">Tải phim:</label>
                                <input type="file" className="form-control" onChange={imagesFileAsURl} id="src" name="thumnail" />
                            </div>
                            <button className='btnUpload' type="submit">Thêm mới</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddSubMovie;