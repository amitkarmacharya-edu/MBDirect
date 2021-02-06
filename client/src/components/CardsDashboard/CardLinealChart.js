import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import * as FcIcons from "react-icons/fc";
import { Card } from "react-bootstrap";
import API from "../../utils/API";

function CardLinealChart() {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    countCategories();
    console.log(chartData);
  }, []);

  function countCategories() {
    let categoriesName = [["Categories", "# Companies"]];
    API.countCategoriesByCompany()
      .then((res) => {
        res.data.forEach((element) => {
          categoriesName.push([element.name, element.numberCompanies]);
        });
      })
      .catch((err) => console.log(err));
    console.log(categoriesName);
    setChartData(categoriesName);
    console.log(chartData);
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
              width={"600px"}
              height={"400px"}
              chartType="ComboChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Month", "Meets"],
                ["Jan", 12],
                ["Feb", 5.5],
                ["Mar", 30],
                ["Apr", 5],
                ["May", 3.5],
                ["Jul", 7],
                ["Agu", 7],
                ["Sep", 7],
                ["Oct", 7],
                ["Nov", 7],
                ["Dec", 7],
              ]}
              options={{
                hAxis: { title: "Months"},
                vAxis: { title: "Meets"},
                legend: "none",
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
            <FcIcons.FcCalendar /> Last Month
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default CardLinealChart;
