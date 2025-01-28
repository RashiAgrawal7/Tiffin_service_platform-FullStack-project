import React, { useState } from "react";
import "./AddProduct.css";
import uploadArea from "../../assets/uplaod-area-image.png";

const AddProduct = ({url}) => {
  const [Image, setImage] = useState(false);
  const [ProductDetails, setProductDetails] = useState({
    name: "",
    approx_price: "",
    location: "Indore",
    delivery_time: "",
    cuisine: "",
    phone_number: "",
    image: "",
  });

  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const ChangeHandler = (e) => {
    setProductDetails({ ...ProductDetails, [e.target.name]: e.target.value });
  };

  const AddProduct = async () => {
    let ResponseData;
    let product = ProductDetails;

    let formData = new FormData();
    formData.append("product", Image);

    await fetch(`${url}/upload`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        ResponseData = data;
      });

    if (ResponseData.success) {
      product.image = ResponseData.image_url;
      console.log(product);
      await fetch(`${url}/products/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };
  return (
    <div className="add-product">
      <div className="add-product-item-field">
        <p>Tiffin Service Title</p>
        <input
          value={ProductDetails.name}
          onChange={ChangeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="add-product-item-field">
        <p>Price</p>
        <input
          value={ProductDetails.approx_price}
          onChange={ChangeHandler}
          type="text"
          name="approx_price"
          placeholder="Type here"
        />
      </div>
      <div className="add-product-item-field">
        <p>Location</p>
        <select
          value={ProductDetails.location}
          onChange={ChangeHandler}
          name="location"
          className="location"
        >
          <option value="Indore">Indore</option>
          <option value="ujjain">ujjain</option>
          <option value="Banglore">Banglore</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>
      <div className="add-product-item-field">
        <p>Delivery Time</p>
        <input
          value={ProductDetails.delivery_time}
          onChange={ChangeHandler}
          type="text"
          name="delivery_time"
          placeholder="Type here"
        />
      </div>
      <div className="add-product-item-field">
        <p>Cuisine</p>
        <input
          value={ProductDetails.cuisine}
          onChange={ChangeHandler}
          type="text"
          name="cuisine"
          placeholder="Type here"
        />
      </div>
      <div className="add-product-item-field">
        <p>Phone Number</p>
        <input
          value={ProductDetails.phone_number}
          onChange={ChangeHandler}
          type="text"
          name="phone_number"
          placeholder="Type here"
        />
      </div>
      <div className="add-product-item-field">
        <p>Upload Image</p>
        <label htmlFor="file-input">
          <img src={Image ? URL.createObjectURL(Image) : uploadArea} className="upload-area-thumbnail-img" alt=""/>
        </label>
        <input onChange={ImageHandler} type="file" name="image" id="file-input" hidden/>
      </div>
      <button onClick={() => {AddProduct();}}className="add-product-btn">ADD</button>
    </div>
  );
};

export default AddProduct;
