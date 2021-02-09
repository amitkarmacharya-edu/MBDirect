import React from "react";
import "./style.css";
function Footer() {
    return(
        <footer className="container-footer">
            <div className="footer-wrapper">
                <div className="row">
                    <div className="col-sm-10 col-md-8 m-auto">
                        <h6>Questions?     
                        <a className="m-2" href="tel:+12023062469">Call us at +1-202-306-2469</a>
                        </h6>
                        <br></br>
                        <div className="d-flex flex-wrap justify-content-between">
                            <a href="#" className="m-2">FAQ</a>
                            <a href="#" className="m-2">Help Center</a>
                            <a href="#" className="m-2">Terms of Use</a>
                            <a href="#" className="m-2">Privacy</a>
                            <a href="#" className="m-2">Cookie Perference</a>
                        </div>
                        {/* social media */}
                        <div className="d-flex flex-wrap justify-content-center mt-4">
                        <a href="#" className="fa fa-facebook fa-2x mb-2 mr-4"></a>
                        <a href="#" className="fa fa-twitter fa-2x mb-2 mr-4"></a>
                        <a href="https://github.com/chernanma/MBDirect" target="_blank" className="fa fa-github fa-2x mb-2 mr-4"></a>
                        <a href="#" className="fa fa-instagram fa-2x mb-2 mr-4"></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div class="col-md-8 col-xs-12 offset-md-2">
                    <div className="panel-footer">
                    ©2020 - 2021 MB Direct - Inter TEAM. All Rights Reserved.
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;