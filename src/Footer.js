import React from "react";
import img1 from "./Anumed’s footer logo.png";

function Footer() {
  return (
    <div className="bg-[#003441] p-5 sm:p-10">
      <div className="xl:flex justify-between">
        <div>
          <img src={img1} className="h-10" />

          <p className="text-[#01B49C] w-auto sm:w-96 mt-2.5 text-sm text-justify">
            ANUMED is a modern Electronic Medical Record system built for
            clinics and hospitals of all sizes — secure, easy, and reliable.
          </p>
        </div>

       <div className="grid lg:grid-cols-3 xl:mt-0 text-sm sm:text-base mt-5 gap-5">
         <div>
          <p className="text-[#01B49C] text-lg mb-3 font-semibold">Quick Links</p>
          <div className="text-white">
            <p>Home</p>
            <p>Features</p>
            <p>Pricing</p>
            <p>Support</p>
          </div>
        </div>

        <div>
          <p className="text-[#01B49C] text-lg mb-3 font-semibold">
            For Clinics & Hospitals
          </p>
          <div className="text-white">
            <p>Request a Demo</p>
            <p>Implementation Timeline</p>
            <p>Support & Onboarding</p>
            <p>Data Security Policy</p>
          </div>
        </div>

        <div>
          <p className="text-[#01B49C] text-lg mb-3 font-semibold">
            Support & Contact
          </p>
          <div className="text-white">
            <p>
              email - <span className="text-[#01B49C]">support@anumed.com</span>
            </p>
            <p>
              Support Hours{" "}
              <span className="text-[#01B49C]">24/7 Available</span>
            </p>
            <p>
              Location{" "}
              <span className="text-[#01B49C]">
                India (Remote + Global Support)
              </span>
            </p>
          </div>
        </div>
       </div>
      </div>
      <hr className="mb-3 mt-10 border-white" />

      <div className="text-white text-sm sm:text-base sm:flex items-center justify-between">
        <p>© 2025 ANUMED HealthTech. All rights reserved.</p>
        <p>Built with ❤️ in India.</p>
      </div>
    </div>
  );
}

export default Footer;
