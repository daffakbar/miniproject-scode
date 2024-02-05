import React from "react";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layouts"));

const Profile = ({ user }) => {
  console.log("USer", user);
  return (
    <LayoutComponent
      metaTitle="Profile"
      metaDescription="ini adalah halaman Profile Page"
      metaKeyword="Profile, Notes"
    >
      <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{user.name}</h2>
            <p className=" text-sm">
              phone: <span className=" text-slate-400"> {user.phone}</span>
            </p>
            <p className=" text-sm">
              web: <span className=" text-slate-400"> {user.website}</span>
            </p>
            <div className="card-actions">
              <button className="btn btn-error">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};
export default Profile;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json();
  // Pass data to the page via props
  return { props: { user } };
}
