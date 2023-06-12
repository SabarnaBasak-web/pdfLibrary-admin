import { useRef, useState } from "react";
import "./AddCategoryModal.style.css";
interface IAddCategoryModal {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
}
function AddCategoryModal({ title, isOpen, closeModal }: IAddCategoryModal) {
  const ref = useRef<HTMLDialogElement>(null);

  const closeModalHandler = (event: any) => {
    event?.preventDefault();
    ref.current?.close();
    closeModal();
  };

  const [category, setCategory] = useState<string>("");
  const [msg, setMsg] = useState("");
  const onFormSubmitHandler = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", category);
    const postDataResponse = await fetch("http://localhost:3000/category", {
      method: "POST",
      body: JSON.stringify({ name: category }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await postDataResponse.json();
    if (result.status === 200) {
      setMsg(result.msg);
      setTimeout(() => {
        setMsg("");
        setCategory("");
      }, 2000);
    }
  };
  return (
    <div className={isOpen ? "overlay" : ""}>
      <dialog open={isOpen} className="modal" id="dialog" ref={ref}>
        <h1 className="modalTitle">{title}</h1>
        {msg ? <h3 className="modalAlertSuccessMsg">{`${msg} ✅`}</h3> : <></>}

        <form className="modalForm">
          <input
            type="text"
            className="formInput"
            value={category}
            placeholder="Enter category name"
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className="formButtonGroup">
            <button className="modalFormButton" onClick={onFormSubmitHandler}>
              Add
            </button>
            <button onClick={closeModalHandler} className="modalFormButton">
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default AddCategoryModal;
