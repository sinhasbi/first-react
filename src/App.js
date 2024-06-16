import "./App.css";
import React, { useState } from "react";
import Data from "./data";

function App() {
  // 從API獲取資料設定到狀態裡面
  const [data, setData] = useState([]);

  // Update 獲取資料
  const handleGetData = async () => {
    const url = "http://nexifytw.mynetgear.com:45000/api/Record/GetRecords";
    try {
      const res = await fetch(url, {
        method: "GET",
      });
      const result = await res.json();

      setData(result.Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Add 新增空白的資料
  const handleAddData = () => {
    const newData = {
      Name: "",
      DateOfBirth: "",
      Salary: "",
      Address: "",
    };
    setData((prevData) => [newData, ...prevData]);
  };

  // Save 儲存更新過的資料
  const handleSave = async () => {
    const url = "http://nexifytw.mynetgear.com:45000/api/Record/SaveRecords";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      if (!result.error ) {
        handleGetData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 表單裡面有變更的話就及時更改 Data Status
  const handleDataChange = (e, index, key) => {
    const newValue = e.target.value;
    const updatedData = data.map((item, idx) =>
      idx === index ? { ...item, [key]: newValue } : item
    );
    setData(updatedData);
  };

  // Data (檢查現在狀態的值)
  // const handleData = async () => {
  //   console.log(data);
  // };

  return (
    <>
      <div className="container">
        <div className="button-container">
          <button className="add-button" onClick={handleAddData}>
            Add
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="update-button" onClick={handleGetData}>
            Update
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Birthday</th>
              <th>Salary</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return (
                <Data
                  key={index}
                  index={index}
                  data={data}
                  handleDataChange={handleDataChange}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 檢查狀態的按鈕 */}
      {/* <button onClick={handleData}>DATA</button> */}
    </>
  );
}

export default App;
