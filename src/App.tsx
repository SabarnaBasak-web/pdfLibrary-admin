import { useState } from "react";
import "./App.css";
import UploadBook from "./components/UploadBook/UploadBook";
import PendingRequest from "./components/PendingRequest";
import ViewUploads from "./components/ViewUploads/ViewUploads";

function App() {
  const [view, setView] = useState(0);
  const RenderViewComponent = () => {
    switch (view) {
      case 1:
        return <UploadBook />;
      case 2:
        return <PendingRequest />;
      case 3:
        return <ViewUploads />;
      default:
        return <h4>Nothing to show </h4>;
    }
  };
  return (
    <>
      <div className="container">
        <h4>Ebook Library Admin</h4>
      </div>
      <div className="navigationSection">
        <button className="navigation-button" onClick={() => setView(1)}>
          Upload Book
        </button>
        <button className="navigation-button" onClick={() => setView(2)}>
          Pending Request
        </button>
        <button className="navigation-button" onClick={() => setView(3)}>
          View all Books
        </button>
      </div>
      <div className="renderComponent">
        {view > 0 ? <RenderViewComponent /> : <></>}
      </div>
    </>
  );
}

export default App;
