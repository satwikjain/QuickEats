import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div>
        {" "}
        <Carousal />{" "}
      </div>
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div>
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter((item) => item.CategoryName === data.CategoryName)
                      .map((filterItems) => {
                        return (
                          <div key={filterItems._id}>
                            <Card></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
}
