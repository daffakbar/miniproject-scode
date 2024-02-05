import React from "react";
import dynamic from "next/dynamic";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const LayoutComponent = dynamic(() => import("@/layouts"));

const History = () => {
  const { data, error, isLoading } = useSWR(
    "https://paace-f178cafcae7b.nevacloud.io/api/notes",
    fetcher,
    { refreshInterval: 3000 }
  );
  console.log("dataaa=>", data);

  return (
    <LayoutComponent
      metaTitle="History"
      metaDescription="ini adalah halaman History Page"
      metaKeyword="History, Notes"
    >
      <div className=" mt-20 mx-5">
        {data?.data.map((note) => (
          <div
            className=" my-2 border  card shadow-md hover:shadow-xl bg-slate-100 mb-4 p-2"
            key={note.id}
          >
            <h1 className=" font-semibold uppercase">{note.title}</h1>
            <p className=" text-sm text-slate-500">
              {ubahFormatTanggal(note.created_at)}
            </p>
          </div>
        ))}
      </div>
    </LayoutComponent>
  );
};

export default History;
function ubahFormatTanggal(tanggalAwal) {
  // Buat objek Date dari string tanggal awal
  const tanggal = new Date(tanggalAwal);

  // Daftar nama bulan dalam Bahasa Indonesia
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Ambil tanggal, bulan, dan tahun dari objek Date
  const tanggalTanggal = tanggal.getDate();
  const namaBulanIndonesia = namaBulan[tanggal.getMonth()];
  const tahun = tanggal.getFullYear();

  // Gabungkan untuk membuat tanggal dalam format yang diinginkan
  const tanggalHasil = `${tanggalTanggal} ${namaBulanIndonesia} ${tahun}`;

  return tanggalHasil;
}
