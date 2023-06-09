import React from "react";
import { useFormik } from "formik";
import "./UploadBook.style.css";
function UploadBook() {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      fileName: "",
      author: "",
      category: [],
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });
  return (
    <div className="uploadContainer">
      <h3>Upload a book</h3>
      <form onSubmit={formik.handleSubmit} className="formContainer">
        <div className="inputContainer">
          <label htmlFor="name">Book Name</label>
          <input
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Book name"
            className="formInput"
            name="name"
          />
        </div>
        <div className="inputContainer">
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="description"
            value={formik.values.description}
            className="formInput"
            onChange={formik.handleChange}
          />
        </div>
        <div className="inputContainer">
          <label>Author</label>
          <input
            type="text"
            name="author"
            placeholder="author"
            value={formik.values.author}
            className="formInput"
            onChange={formik.handleChange}
          />
        </div>
        <div className="inputContainer">
          <label>Category Tags</label>
          <input
            type="text"
            name="category"
            placeholder="category"
            value={formik.values.category}
            className="formInput"
            onChange={formik.handleChange}
          />
        </div>
        <div className="inputContainer">
          <label>Book Upload</label>
          <input
            type="file"
            name=""
            placeholder="author"
            value={formik.values.author}
            className="formInput"
            onChange={formik.handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default UploadBook;
