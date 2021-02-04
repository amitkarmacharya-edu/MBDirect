import React from "react";
import "./style.css";
function Footer() {
    return(
        <footer className="container-fluid border pt-5">
            <div className="row">
                <div className="col-sm-10 col-md-8 m-auto">
                    <h5>Questions?
                        <a href="tel:+62896706255135"> Call us at +62-896-7062-55135</a>
                    </h5>
                    <div className="d-flex flex-wrap justify-content-between">
                        <a href="/" className="m-2">FAQ</a>
                        <a href="/" className="m-2">Help Center</a>
                        <a href="/" className="m-2">Terms of Use</a>
                        <a href="/" className="m-2">Privacy</a>
                        <a href="/" className="m-2">Cookie Perference</a>
                    </div>
                    {/* social media */}
                    <div className="d-flex flex-wrap justify-content-end mt-2">
                    <a href="#" className="fa fa-facebook m-1"></a>
                    <a href="#" className="fa fa-twitter m-1"></a>
                    <a href="#" className="fa fa-youtube m-1"></a>
                    <a href="#" className="fa fa-instagram m-1"></a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 border p-2 text-center mt-2">
                    2021 copyright
                </div>
            </div>
        </footer>
    );
}
export default Footer;