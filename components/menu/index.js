import React, { useState } from "react";
import Link from "next/link";

const Menu = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="btm-nav">
      <Link
        className={active === 1 ? "active" : ""}
        onClick={() => setActive(1)}
        href={"/"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="btm-nav-label">Home</span>
      </Link>

      <Link
        className={active === 2 ? "active" : ""}
        onClick={() => setActive(2)}
        href={"/history"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="btm-nav-label">History</span>
      </Link>

      <Link
        className={active === 3 ? "active" : ""}
        onClick={() => setActive(3)}
        href={"/profile"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        <span className="btm-nav-label">Profile</span>
      </Link>
    </div>
  );
};

export default Menu;
