import React from "react";

export default function Footer() {
    return (
      <>
        <footer
          className="bg-cover bg-top bg-no-repeat bg-opacity-70"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-photo/workplace-with-smartphone-laptop-black-table-top-view-copyspace-background_144627-24860.jpg?t=st=1728678951~exp=1728682551~hmac=0988ea8419d64a27fbdaebf5c009f0c1d2a112c89173f246a1bb4bc6593161e2&w=996)",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="container text-gray-100 py-8">
            Job Board &copy; 2024 &ndash; All rights reserved
          </div>
        </footer>
      </>
    );
}