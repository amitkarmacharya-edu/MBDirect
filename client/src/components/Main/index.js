import React, { useEffect, useState } from "react";
import BusinessCategory from "../BusinessCategory";
import API from "../../utils/API";
import SliderContainer from "../SliderContainer";
import NetSlider from "netslider";
import "netslider/dist/styles.min.css";

function Main() {
  const [businessList, setBusinessLIst] = useState({});

  useEffect(() => {
    Promise.all([API.getCategories(), API.getCompaniesByCategoryId()])
      .then((data) => {
        const categories = {};
        data[0].data.forEach((c) => {
          categories[c.id] = c.name;
        });

        const companies = data[1].data;
        const businessList = {};
        companies.forEach((company) => {
          // net slider key/value
          company["title"] = company["name"];
          company["image"] = company["logo"];
          company["imageHighRes"] = company["image"];
          if (businessList[categories[company.CategoryId]]) {
            businessList[categories[company.CategoryId]].push(company);
          } else {
            businessList[categories[company.CategoryId]] = [company];
          }
        });
        setBusinessLIst(businessList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <main className="container-md">
      <div className="row">
        {Object.keys(businessList).map((key, index) => {
          console.log(businessList[key]);
          return (
            <div className="col-12" key={index}>
              <h3 className="text-white">{key}</h3>
              <NetSlider
                className="netslider_title_card"
                data={businessList[key]}
                slideTemplate={(props) => <SliderContainer {...props} />}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
export default Main;
