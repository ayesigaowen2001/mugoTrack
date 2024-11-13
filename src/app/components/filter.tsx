import React from "react";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
const Filter: React.FC = () => {
  return (
    <div
      className="flex rounded-md flex-row ml-5  bg-gray-100 "
      style={{ width: "100%", height: "70px" }}
    >
      <div className="flex-col px-2">
        <h3>tag id</h3>
        <InputText className="border rounded-md border-[#201c1c]" />
      </div>
      <Divider
        layout="vertical"
        type="solid"
        style={{ color: "#00FF00", width: "5px" }}
      />
      <div className="flex-col px-2">
        <h3>Species</h3>
        <InputText className="border rounded-md border-[#201c1c]" />
      </div>
      <Divider
        layout="vertical"
        type="solid"
        style={{ color: "#00FF00", width: "5px" }}
      />
      <div className="flex-col px-2">
        <h3>Location</h3>
        <InputText className="border rounded-md border-[#201c1c]" />
      </div>
      <Divider
        layout="vertical"
        type="solid"
        style={{ color: "#00FF00", width: "5px" }}
      />
      <Button
        className="mt-8  rounded-md ml-10 bg-green-700"
        style={{ width: "100px", height: "30px" }}
        label="Apply filter"
      />
    </div>
  );
};

export default Filter;
