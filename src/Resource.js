import React, { useState } from "react";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import img1 from "./what-is-asthma.jpg";

function Resource() {
  const [currentState, setcurrentState] = useState("articles");

  return (
    <div>
      <MainNavbar />
      <div>
        <div className="text-center my-5">
          <p className="text-[#003441] text-5xl font-bold">
            Resources & <span className="text-[#01B49C]">Insights</span>
          </p>
          <div className="flex justify-center mt-3">
            <p className="text-[#01B49C] w-8/12">
              Discover expert tips, in-depth EMR guides, and the latest
              healthcare trends from ANUMED — your trusted source for insights
              that help modernize hospital operations, enhance patient care, and
              keep your practice ahead in the digital healthcare revolution.
            </p>
          </div>
        </div>
        <div className="flex pb-3 mx-5 border-b border-gray-300 items-center justify-between">
          <div className="text-[#003441] font-semibold text-lg flex items-center justify-center space-x-12">
            <button
              onClick={() => {
                setcurrentState("articles");
              }}
              className={`${
                currentState === "articles" ? "text-[#01B49C]" : ""
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => {
                setcurrentState("news");
              }}
              className={`${currentState === "news" ? "text-[#01B49C]" : ""}`}
            >
              News
            </button>
            <button
              onClick={() => {
                setcurrentState("health-tips");
              }}
              className={`${
                currentState === "health-tips" ? "text-[#01B49C]" : ""
              }`}
            >
              Health Tips
            </button>
            <button
              onClick={() => {
                setcurrentState("emr-tips");
              }}
              className={`${
                currentState === "emr-tips" ? "text-[#01B49C]" : ""
              }`}
            >
              EMR Tips
            </button>
          </div>

          <div>
            <input
              placeholder="Search EMR Tips, News, Articles and more..."
              className="w-96 rounded border border-gray-300 p-1.5"
            />
          </div>
        </div>

        <div className="p-5 grid grid-cols-4 gap-5">
          <div className="border shadow p-4 rounded border-gray-300">
            <img src={img1} className="h-40 w-full" />
            <p className="text-[#003441] text-xl font-semibold">
              Asthma Management Tips
            </p>
            <p className="text-[#01B49C] text-justify">
              Learn how to control asthma symptoms through lifestyle changes,
              inhaler routines, and recognizing early warning signs to prevent
              flare-ups.
            </p>
          </div>

          <div className="border shadow p-4 rounded border-gray-300">
            <img src={img1} className="h-40 w-full" />
            <p className="text-[#003441] text-xl font-semibold">
              Asthma Management Tips
            </p>
            <p className="text-[#01B49C] text-justify">
              Learn how to control asthma symptoms through lifestyle changes,
              inhaler routines, and recognizing early warning signs to prevent
              flare-ups.
            </p>
          </div>
          <div className="border shadow p-4 rounded border-gray-300">
            <img src={img1} className="h-40 w-full" />
            <p className="text-[#003441] text-xl font-semibold">
              Asthma Management Tips
            </p>
            <p className="text-[#01B49C] text-justify">
              Learn how to control asthma symptoms through lifestyle changes,
              inhaler routines, and recognizing early warning signs to prevent
              flare-ups.
            </p>
          </div>
          <div className="border shadow p-4 rounded border-gray-300">
            <img src={img1} className="h-40 w-full" />
            <p className="text-[#003441] text-xl font-semibold">
              Asthma Management Tips
            </p>
            <p className="text-[#01B49C] text-justify">
              Learn how to control asthma symptoms through lifestyle changes,
              inhaler routines, and recognizing early warning signs to prevent
              flare-ups.
            </p>
          </div>
          <div className="border shadow p-4 rounded border-gray-300">
            <img src={img1} className="h-40 w-full" />
            <p className="text-[#003441] text-xl font-semibold">
              Asthma Management Tips
            </p>
            <p className="text-[#01B49C] text-justify">
              Learn how to control asthma symptoms through lifestyle changes,
              inhaler routines, and recognizing early warning signs to prevent
              flare-ups.
            </p>
          </div>

          <div className="border shadow p-4 rounded border-gray-300">
            <img src={img1} className="h-40 w-full" />
            <p className="text-[#003441] text-xl font-semibold">
              Asthma Management Tips
            </p>
            <p className="text-[#01B49C] text-justify">
              Learn how to control asthma symptoms through lifestyle changes,
              inhaler routines, and recognizing early warning signs to prevent
              flare-ups.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

//
export default Resource;
