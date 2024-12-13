import { useState } from "react";
import "./App.css";
import Picture from "./components/picture";
function App() {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState([]);
  function searchImage(e) {
    e.preventDefault();
    if (!text) {
      alert("กรุณาป้อนชื่อรูปภาพที่อยากค้นหา");
    } else {
      fetchDatafromApi();
    }
  }
  async function fetchDatafromApi() {
    const url = `${
      import.meta.env.VITE_API_URL
    }?page=1&query=${text}&client_id=${
      import.meta.env.VITE_API_KEY
    }&per_page=15`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;
    if (result.length == 0) {
      alert("ไม่พบข้อมูล");
      setText("");
    } else {
      setPhoto(result);
    }
  }
  return (
    <>
      <h1 className="text-3xl md:text-4xl text-red-400 font-semibold text-center py-6 md:py-10 mx-auto">
        Search image with API
      </h1>
      <div className="text-center py-5">
        <form
          onSubmit={searchImage}
          className="flex flex-col sm:flex-row justify-center items-center gap-2"
        >
          <input
            className="px-4 py-2 w-4/5 sm:w-auto rounded-2xl text-red-400 placeholder:text-sm md:placeholder:text-base border border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none"
            type="text"
            placeholder="ป้อนชื่อรูปภาพที่ต้องการค้นหา"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="text-white bg-red-400 px-4 py-2 rounded-2xl hover:bg-red-500 transition-colors duration-300"
            type="submit"
          >
            ค้นหา
          </button>
        </form>
      </div>
      <div className="w-11/12 md:w-4/5 mx-auto mt-10 md:mt-[100px] mb-10 md:mb-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photo.map((data, index) => {
          return <Picture {...data} key={index} />;
        })}
      </div>
    </>
  );
}

export default App;
