import React, { useEffect, useState } from "react";
import BusinessCategory from "../BusinessCategory";
import API from "../../utils/API";

function Main() {
    const [businessList, setBusinessLIst] = useState({});

    useEffect(() => {

        Promise.all([API.getCategories(), API.getCompaniesByCategoryId()])
            .then(data => {
                const categories = {};
                data[0].data.forEach(c => {
                    categories[c.id] = c.name;
                });

                const companies = data[1].data;
                const businessList = {};
                companies.forEach(company => {
                    if (businessList[categories[company.CategoryId]]){
                        businessList[categories[company.CategoryId]].push(company);
                    } else {
                        businessList[categories[company.CategoryId]] = [company];
                    }
                });
                setBusinessLIst(businessList);

            })
            .catch(err => {
                console.log(err);
            });

    }, []);
    return (
        <main className="container-md">
            <div className="row">
                {Object.keys(businessList).map((key, index) => {
                    return <BusinessCategory key={index} header={key} bList={businessList[key]}/>
                })}
            </div>

        </main>
    );
}
export default Main;