import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@/hooks/useMutation";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Swal from "sweetalert2";
const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Home({ notes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edited, setEdited] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const { mutate } = useMutation();

  const { data, error, isLoading } = useSWR(
    "https://paace-f178cafcae7b.nevacloud.io/api/notes",
    fetcher,
    { refreshInterval: 1000 }
  );

  const handleSubmit = async () => {
    const formNotes = { title, description };
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formNotes),
      });

      if (response?.ok) {
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditNote = async (id) => {
    const res = await fetch(
      `https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`
    );
    const listNotes = await res.json();
    setEdited(true);
    setIdEdit(id);
    setTitle(listNotes.data.title);
    setDescription(listNotes.data.description);
  };
  const handeEditSubmit = async (id) => {
    const formNotes = { title, description };
    const res = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
      method: "PATCH",
      payload: formNotes,
    });
    if (res?.success) {
      setTitle("");
      setDescription("");
    }
  };
  const HandleDelete = async (id, title) => {
    Swal.fire({
      title: `Anda akan menghapus note ${title} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await mutate({
          url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
          method: "DELETE",
        });
        if (res?.success) {
          Swal.fire({
            title: "Terhapus!",
            text: "Note Berhasil dihapus!",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <LayoutComponent
      metaTitle="Home"
      metaDescription="ini adalah halaman Home Page"
      metaKeyword="Home, Notes"
    >
      {/* Loading */}
      {isLoading && (
        <center>
          <span className="loading loading-bars loading-lg mt-20"></span>
        </center>
      )}
      {/* List Notes */}
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-4">
        {data?.data?.map((note) => (
          <div className="card bg-base-100 shadow-xl" key={note.id}>
            <div className="card-body">
              <h2 className="card-title">{note.title}</h2>
              <p>{note.description} </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    document.getElementById("my_modal_2").showModal();
                    handleEditNote(note.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn  btn-secondary"
                  onClick={() => HandleDelete(note.id, note.title)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Button Add Notes */}
      <button
        className="btn btn-circle btn-primary fixed shadow-xl right-5 bottom-20"
        onClick={() => {
          document.getElementById("my_modal_2").showModal();
          setTitle("");
          setDescription("");
          setEdited(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
      </button>
      {/* Modal Add Notes */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box px-4">
          <h3 className="font-bold text-xl">Form Notes</h3>
          <label className="form-control w-full  my-2">
            <div className="label">
              <span className="label-text">Title :</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="form-control w-full  my-2">
            <div className="label">
              <span className="label-text">Title :</span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          {/* Button Modal */}
          {edited ? (
            <button
              className=" btn btn-accent w-full my-2"
              onClick={() => handeEditSubmit(idEdit)}
            >
              Edit
            </button>
          ) : (
            <button
              className=" btn btn-primary w-full my-2"
              onClick={handleSubmit}
            >
              Save
            </button>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </LayoutComponent>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  // Pass data to the page via props
  return { props: { notes } };
}
