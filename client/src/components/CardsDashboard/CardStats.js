import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import * as FcIcons from "react-icons/fc";
import { Card } from "react-bootstrap";
import API from "../../utils/API";

function CardStats() {
    const [chartData, setChartData] = useState();

    useEffect(() => {
        countCategories();
    }, [])

    function countCategories(){
        let categoriesName = [["Categories", "# Companies"]];
        API.countCategoriesByCompany()
        .then((res) => {
            res.data.forEach(element => {
                categoriesName.push([element.name,element.numberCompanies]);
            })
        })
        .catch((err) => console.log(err));
        setChartData(categoriesName);
    }

  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title tag="h5" className="title-header">
            Company Statistics
          </Card.Title>
          <p className="card-category">Categories Performance</p>
        </Card.Header>
        <Card.Body style={{overflow: "auto"}}>
          <div style={{ display: "flex", maxWidth: 900 }}>
            <Chart 
              width={"100%"}
              height={"auto"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                fontSize: 10,
                chartArea:{width: "100%", height: "90%"},
                legend: {textStyle: {color: 'blue', fontSize: 14}}
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <hr />
          <div className="stats">
            <FcIcons.FcPieChart /> Pie Chart
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default CardStats;
