import React, { useState } from "react";
import { useFormik } from "formik";
import "./UploadBook.style.css";

function UploadBook() {
  const [fileName, setFileName] = useState<Blob | null>(null);
  const [alert, setAlert] = useState({
    display: false,
    msg: "",
    status: 0,
  });
  const formHandleChange = (type: string, e: any) => {
    setFileName(e.target.files[0]);
    console.log("Event", e.target.files[0], typeof e, type);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      authorName: "",
      categoryName: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("fileName", fileName);
      formData.append("description", values.description);
      formData.append("authorName", values.authorName);
      formData.append("categoryName", values.categoryName);
      formData.append("username", "Sankha");

      try {
        console.log(JSON.stringify(values), fileName);
        const response = await fetch("http://localhost:3000/ebook", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log("Result", result);
        setAlert({ display: true, msg: result.msg, status: result.status });
      } catch (err) {
        console.log("Error ", err);
      }
    },
  });

  return (
    <div className='uploadContainer'>
      <h3>Upload a book</h3>
      <form
        onSubmit={formik.handleSubmit}
        className='formContainer'
        encType='multipart/form-data'
      >
        <div className='inputContainer'>
          <label htmlFor='name'>Book Name</label>
          <input
            type='text'
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder='Book name'
            className='formInput'
            name='name'
          />
        </div>
        <div className='inputContainer'>
          <label>Description</label>
          <input
            type='text'
            name='description'
            placeholder='description'
            value={formik.values.description}
            className='formInput'
            onChange={formik.handleChange}
          />
        </div>
        <div className='inputContainer'>
          <label>Author</label>
          <input
            type='text'
            name='authorName'
            placeholder='author'
            value={formik.values.authorName}
            className='formInput'
            onChange={formik.handleChange}
          />
        </div>
        <div className='inputContainer'>
          <label>Category Tags</label>
          <input
            type='text'
            name='categoryName'
            placeholder='category'
            value={formik.values.categoryName}
            className='formInput'
            onChange={formik.handleChange}
          />
        </div>
        <div className='inputContainer'>
          <label>Book upload</label>
          <input
            type='file'
            name='fileName'
            className='formInput'
            onChange={(e) => formHandleChange("file", e)}
          />
        </div>
        <div className='inputContainer'></div>
        <div></div>
        <div className='formButtonGroup'>
          <button className='formSubmit' type='submit' value='Submit'>
            Submit
          </button>
          <button
            className='formReset'
            type='reset'
            value='Reset'
            onClick={() => formik.resetForm()}
          >
            Reset
          </button>
        </div>
      </form>

      {alert.display && <div>{alert.msg}</div>}
    </div>
  );
}

export default UploadBook;
