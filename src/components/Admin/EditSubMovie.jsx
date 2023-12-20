import axios from "axios"
import React, {  useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import noimage from '~/assets/imgs/noimage.jpg';
import '~/css/AddCategory.css'
import { Switch } from "@mui/material";
const PRODUCT_API_BASE_URL = "http://localhost:8085/api/v1/movies"
const SUBMOVIE_API_BASE_URL = "http://localhost:8085/api/v1/movies/submovie"

const EditSubMovie = () => {
    const [product, setProduct] = useState({})
    const [file,setFile] = useState({})
    let navigative = useNavigate()
    const [image, setImage] = useState(noimage)
    const [active, setActive] = useState(false);
    const { id } = useParams();
    const [subMovie, setSubMovie] = useState({})
    const {state} = useLocation();
    console.log(state)
    console.log("EDIDIDIDIDIDIDIDDIDIDIDIDIDIDIDI")
    const fetchDetailMovie = () => {
        axios.get(PRODUCT_API_BASE_URL + "/" + state?.movieId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            setProduct(res.data?.data);
            setImage(res.data?.data.thumnail);
            console.log(res.data?.data.categories)

        })
            .catch(err => {
                console.log(err);
            })
    }
    const fetchDetailSubMovie = () => {
        axios.get(SUBMOVIE_API_BASE_URL + "/detail/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(res => {
            setSubMovie(res.data?.data);
            setActive(res?.data?.data?.active);
        })
            .catch(err => {
                console.log(err);
            })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(subMovie)
        const formData = new FormData();
        formData.append("name", subMovie?.name)
        if (subMovie?.file)
            formData.append("file", subMovie?.file)
        formData.append("episode", subMovie?.description)
        console.log('update:', subMovie)
        // formData.append("stockQuantity",product.stockQuantity)
        // axios.put(SUBMOVIE_API_BASE_URL + "/" + id,
        //     formData,
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        //         },
        //     })
        //     .then(() => {
        //         navigative("/admin/product/submovie/" + product?.id)
        //         alert("Lưu thành công")
        //     })
        //     .catch((error) => {
        //         alert("Không thành công")
        //     })
    }


    const handleChange = (event) => {
        setSubMovie({
            ...subMovie,
            [event.target.name]: event.target.value
        })
    }
    const imagesFileAsURl = (fileSelected) => {
        if (fileSelected.target.files && fileSelected.target.files.length > 0) {
            setFile(URL.createObjectURL(fileSelected.target.files[0]));
        }
        setSubMovie({
            ...subMovie,
            [fileSelected.target.name]: fileSelected.target.files[0]
        })
    }
    useEffect(() => {
        fetchDetailMovie();
        fetchDetailSubMovie();
    }, [])
    return (
        <>

            <div className='pageCate'>
                <div className="BtnListCate">
                    <h1 className='titlePageCate' >Sửa phim</h1>
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
                                <label style={{ marginBottom: "5px" }} htmlFor="productName">Tên tập phim:</label>
                                <input type="text" className="form-control" id="productName" name="name" onChange={handleChange} value={subMovie?.name} />
                            </div>

                            <div class="form-group">
                                <label style={{ marginBottom: "5px" }} htmlFor="productName">Tập:</label>
                                <input type="text" className="form-control" id="price" name="episode" onChange={handleChange} value={subMovie?.episode} />
                            </div>
                            {/* <div class="form-group">
                                <label style={{ marginBottom: "5px" }} htmlFor="productName">Thời lượng:</label>
                                <input type="text" className="form-control" id="price" name="duration" onChange={handleChange} value={product?.duration} />
                            </div> */}
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
                            {/* 
                            <div class="form-group">
                                <label style={{ marginBottom: "5px" }} htmlFor="productName">Mô tả:</label>
                                <textarea className="form-control" id="moTa" name="description" onChange={handleChange} value={product?.descption}></textarea >
                            </div> */}


                        </div>
                        <div style={{ width: "45%" }} className="uploadImg">
                            <div className="cateImage">
                                <img id="categoryImg" src={image} alt="" />
                            </div>
                            <div>
                                <label style={{ marginBottom: "5px" }} htmlFor="thumnail">Tải phim:</label>
                                <input type="file" className="form-control" onChange={imagesFileAsURl} id="thumnail" name="file" />
                            </div>
                            {/* <div>
                                <label style={{ marginBottom: "5px", marginTop: '10px' }} htmlFor="categoryName">Danh mục:</label>
                                <MultipleSelectChip data={categories} setCategories={setCateSelect} selectedCategory={cateSelect?.map(e => e?.name)} />
                            </div> */}
                            <button className='btnUpload' type="submit">Cập nhật</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditSubMovie;