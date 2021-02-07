import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import * as FcIcons from "react-icons/fc";
import { Card } from "react-bootstrap";
import API from "../../utils/API";
import { USERID } from "../../constants/apiConstants";


function CardLinealChart(props) {
  const [chartData, setChartData] = useState();
  const [userType, setUserType] = useState("");


  useEffect(() => { 
    typeUsers();  
    countMeets();
  }, [userType]);
  
  function typeUsers() {
    const userId = localStorage.getItem(USERID);
    API.getUser(userId).then((res) => {
      setUserType(res.data.type);
    });
  }

  function countMeets() {
    let meetsMonths = [["Month", "# Meets"]];
    let date = new Date();
    let year = date.getFullYear();
    if (userType === "Owner") {
      API.countMeetsByMonth(localStorage.getItem(USERID),year)
      .then((res) => {
        res.data.forEach((element) => {
          meetsMonths.push([element.MonthName, element.Meets]);
        });
      })
      .catch((err) => console.log(err));
    } else if (userType === "Admin"){
      API.countAllMeetsByMonth(year)
      .then((res) => {
        res.data.forEach((element) => {
          meetsMonths.push([element.MonthName, element.Meets]);
        });
      })
      .catch((err) => console.log(err));
    } 
    
    setChartData(meetsMonths);
  }



  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title tag="h5" className="title-header">
            Meets Statistics
          </Card.Title>
          <p className="card-category">Total meets by month</p>
        </Card.Header>
        <Card.Body style={{ overflow: "auto" }}>
          <div style={{ display: "flex", maxWidth: 900 }}>
            <Chart
              width={"100%"}
              height={"auto"}
              chartType="ComboChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                hAxis: { title: "Months"},
                vAxis: { title: "Meets"},
                legend: "none",
                chartArea:{width: "70%", height: "70%"},
                seriesType: "bars",           
              }}
              rootProps={{ "data-testid": "1" }}
              chartPackages={["corechart", "controls", "charteditor"]}
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <hr />
          <div className="stats">
            <FcIcons.FcBarChart /> Lineal Bar Chart
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default CardLinealChart;
