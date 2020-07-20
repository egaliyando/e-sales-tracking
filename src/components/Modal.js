import React, { useState } from "react";

function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex">
        <button className="focus:outline-none w-5" onClick={() => setShowModal(true)}>
          <img src={require(`assets/icons/ic_pencil.svg`)} alt="add" />
        </button>
        <button className="mx-5 focus:outline-none w-4" onClick={() => alert("Yakin Menghapus?")}>
          <img src={require(`assets/icons/ic_trash.svg`)} alt="add" />
        </button>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            // onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Kelola User</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    className="bg-gray-200 w-full mb-5 p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                    type="text"
                    placeholder="Nama Produk"
                  />
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      className="bg-gray-200 border p-2 rounded-lg border-1 border-gray-300 focus:outline-none"
                      type="number"
                      placeholder="Stok"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
