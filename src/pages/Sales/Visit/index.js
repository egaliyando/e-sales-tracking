import React, { useState } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Rute, Nonrute, Done } from "./ListVisit";

//componrnt tab
const tabItems = [
  {
    id: 1,
    title: "Rute",
    content: <Rute />,
  },
  {
    id: 2,
    title: "Nonrute",
    content: <Nonrute />,
  },
  {
    id: 3,
    title: "Done",
    content: <Done />,
  },
];
const TabItemComponent = ({
  title = "",
  onItemClicked = () => console.error("You passed no action to the component"),
}) => {
  return (
    <div onClick={onItemClicked}>
      <p>{title}</p>
    </div>
  );
};
//componrnt tab

function Visit() {
  const [active, setActive] = useState(0);

  return (
    <Container>
      <Header hSales={true} />
      <div className="h-auto p-3">
        <div className="bg-white rounded-lg flex h-auto justify-around text-sm p-2 font-bold text-gray-500">
          {tabItems.map(({ id, title }) => (
            <TabItemComponent key={title} title={title} onItemClicked={() => setActive(id)} isActive={active === id} />
          ))}
        </div>
        {tabItems.map(({ id, content }) => {
          return active === id ? content : "";
        })}
      </div>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} />
      </div>
    </Container>
  );
}

export default Visit;
