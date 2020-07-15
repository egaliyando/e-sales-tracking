import React from "react";

export default function Thead({ text }) {
  return (
    <thead>
      <tr style={{ backgroundColor: "#D5D5D5" }}>
        {text.map((text, index) => {
          return (
            <th className="text-left text-sm pl-2 py-2" key={index}>
              {text}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
