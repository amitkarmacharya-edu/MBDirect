import React, { useEffect, useState } from "react";
import "./style.css";
import Carousel from "react-bootstrap/Carousel";
import API from "../../utils/API";

function Jumbo() {
  const [adsData, setAdsData] = useState([]);

  useEffect(() => {
    loadAds();
  }, []);

  function loadAds() {
    let ads = [];
    API.getAds().then((res) => {
      if (res.data.length !== 0) {
        for (let i = 0; i < res.data.length; i++) {
          if (i <= 5) {
            ads.push(res.data[i]);
          }
        }
      }
      setAdsData(ads);
      console.log(ads);
    });
  }

  return (
    <div className="container-search">
      <div className="search-wrapper">
        <Carousel>
          {adsData.map((res) => (
            <Carousel.Item interval={1000}>
              <div className="adimage col-md-8 offset-md-2">
                <img className="banner" src={res.image} alt={res.id} />
              </div>
              <Carousel.Caption className="captions" style={{paddingTop: "5px"}}>
                <h3>{res.name}</h3>
                <p>{res.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default Jumbo;
