import { useState, useEffect } from "react";
import { useFormik } from "formik";
import "./UploadBook.style.css";
import Select from "react-select";
import AddCategoryModal from "../Modal/AddCategoryModal";
import { ICategoryResponse } from "../../types/ResponseTypes";

interface IFormattedCategory {
  label: string;
  value: string;
}
function UploadBook() {
  const defaultAlertState = {
    display: false,
    msg: "",
    status: 0,
  };
  const [fileName, setFileName] = useState<Blob | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [allCategories, setAllCategories] = useState<IFormattedCategory[]>([]);
  const [categories, setCategories] = useState<IFormattedCategory[]>([]);
  const [alert, setAlert] = useState(defaultAlertState);

  const selectChangeHandler = (e: IFormattedCategory) => {
    return setCategories(e);
  };

  const resetAlertState = () => {
    setAlert(defaultAlertState);
  };
  const getAllCategories = async () => {
    const response = await fetch("http://localhost:3000/category");
    const allCategories = await response.json();
    const formatedCategoryList: IFormattedCategory[] = allCategories.reduce(
      (acc: IFormattedCategory[], curr: ICategoryResponse) => {
        acc.push({ value: curr.name, label: curr.name });
        return acc;
      },
      []
    );
    setAllCategories(formatedCategoryList);
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  const formHandleChange = (type: string, e: any) => {
    setFileName(e.target.files[0]);
    console.log("Event", e.target.files[0], typeof e, type);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      authorName: "",
      categoryName: [],
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      const formatedCategory = categories?.reduce(
        (acc: string[], curr: IFormattedCategory) => {
          acc.push(curr.value);
          return acc;
        },
        []
      );
      if (
        !values.name ||
        !fileName ||
        !values.description ||
        !values.authorName ||
        !formatedCategory.length
      ) {
        setAlert({
          display: true,
          status: 404,
          msg: "Fields should not be empty",
        });
        setTimeout(() => {
          resetAlertState();
        }, 3000);
        return;
      }
      formData.append("name", values.name);
      formData.append("fileName", fileName);
      formData.append("description", values.description);
      formData.append("authorName", values.authorName);
      formData.append("categoryName", formatedCategory.join(","));
      formData.append("username", "Sankha");

      try {
        console.log(JSON.stringify(values), fileName);
        const response = await fetch("http://localhost:3000/ebook", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        setAlert({ display: true, msg: result.msg, status: result.status });
        setTimeout(() => {
          resetAlertState();
        }, 3000);
      } catch (err) {
        console.log("Error ", err);
      }
    },
  });

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };
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
          <div className='inputContainerTags'>
            <label>Category tags</label>
            <p className='openModalBtn' onClick={openModalHandler}>
              Add category
            </p>
          </div>

          <Select
            isMulti
            name='categoryNameList'
            options={allCategories}
            className='selectFormInput'
            onChange={selectChangeHandler}
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

      <AddCategoryModal
        isOpen={openModal}
        title='Add Category'
        closeModal={closeModalHandler}
      />

      {alert.display && (
        <div
          className={`alertContainer ${
            alert.status !== 201 ? "danger" : "success"
          }`}
        >
          {alert.status !== 201 ? "❗" : "✔️"} {alert.msg}
        </div>
      )}
    </div>
  );
}

export default UploadBook;
