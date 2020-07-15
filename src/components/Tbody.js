import React from "react";

export default function Tbody({ text_body }) {
  return (
    <tbody>
      <tr className="border">
        {text_body.map((text_body, index_body) => {
          return (
            <td className="text-left text-sm pl-2 py-2" key={index_body}>
              {text_body}
            </td>
          );
        })}
      </tr>
    </tbody>
  );
}
