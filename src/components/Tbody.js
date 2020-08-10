import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Tbody({
  data,
  display,
  editUrl,
  deleteAction,
  customAction,
  actionNotDisplay,
}) {
  if (!data) return "";
  console.log(data.role);

  return (
    <tbody>
      {data.length ? (
        data.map((data, i) => {
          return (
            <tr className="border" key={i}>
              {/* cek jika key lebih dari -1 makan kita tampilin data nya */}
              {Object.keys(data).map((key) => {
                if (display.indexOf(key) > -1) {
                  return (
                    <td key={data[key]} className="text-left text-sm pl-2 py-2">
                      {data[key] === "id" ? data[key] + 1 : data[key]}
                    </td>
                  );
                }
              })}
              {!actionNotDisplay && (
                <td>
                  <div className="flex justify-start">
                    {editUrl && (
                      <Link
                        className="justify-center mr-5"
                        to={`${editUrl}/${data.id}`}
                      >
                        <img
                          src={require(`assets/icons/ic_pencil.svg`)}
                          alt="edit"
                        />
                      </Link>
                    )}
                    {deleteAction && (
                      <button
                        className="focus:outline-none"
                        onClick={() => {
                          data.role === undefined
                            ? deleteAction(data.id)
                            : deleteAction(data.user_id);
                        }}
                      >
                        <img
                          src={require(`assets/icons/ic_trash.svg`)}
                          alt="delete"
                        />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  );
}
