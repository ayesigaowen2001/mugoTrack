"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import Image from "next/image"; // Use Next.js Image component

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null); // Active menu item
  const [expandedItems, setExpandedItems] = useState<string[]>([]); // Tracks expanded items

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string) => {
    setActiveItem(item); // Set clicked item as active
  };

  const toggleSubItems = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const menuItems = [
    { title: "Map", items: ["View location", "Geofence", "Track"] },
    { title: "Tags", items: ["Create tags", "View tags"] },
    { title: "Notifications", items: ["View notifications"] },
    { title: "Analytics", items: ["Report"] },
    {
      title: "Settings",
      items: [
        {
          title: "Account information",
          subItems: ["Bio data", "Edit profile"], // Sub-items
        },
      ],
    },
    { title: "Permissions", items: ["View access"] },
  ];

  return (
    <div
      style={{
        background: "#F5F5F5",
        width: isOpen ? "236.33px" : "33px",
        height: isOpen ? "560.64px" : "35px",
        marginTop: isOpen ? "0px" : "10px",
      }}
    >
      <div className="flex flex-row ">
        {isOpen && (
          <div className="flex mt-3" style={{ width: "190px" }}>
            <div
              style={{
                height: "30.95px",
                width: "46px",
                background: "#8E6C2F",
                marginLeft: "31px",
                borderRadius: "30px",
                paddingLeft: "14px",
                paddingRight: "10px",
                paddingTop: "4px",
              }}
            >
              <Image
                src="/images/icons/icons8-year-of-ox-30.png"
                alt="Logo"
                width={19.17}
                height={20.87}
              />
            </div>
            <h3
              style={{ color: "#8E6C2F", fontWeight: 400, height: "23.16px" }}
            >
              mugoTracker
            </h3>
          </div>
        )}
        <div style={{ marginLeft: isOpen ? "15px" : "5px" }}>
          <Button
            icon={
              <Image
                src="/images/icons/sidebar.png"
                alt="Toggle Icon"
                width={24}
                height={24}
              />
            }
            className="p-button-text mt-3"
            onClick={toggleSidebar}
          />
        </div>
      </div>

      <div className={`flex font-['Imprima'] ${isOpen ? "block" : "hidden"}`}>
        <div className="p-4">
          {menuItems.map((menu, index) => (
            <div key={menu.title}>
              {index > 0 && (
                <Divider
                  style={{ width: "230px" }}
                  className="bg-green-600"
                  layout="horizontal"
                  type="solid"
                />
              )}
              <h4 className="text-base font-semibold ml-4 mt-2">
                {menu.title}
              </h4>
              <ul className="ml-6 space-y-0">
                {menu.items.map((item) =>
                  typeof item === "string" ? (
                    <li
                      key={item}
                      onClick={() => handleItemClick(item)}
                      className={classNames(
                        "cursor-pointer rounded-md transition-colors duration-500",
                        {
                          "bg-gray-200 text-green-500": activeItem === item,
                          "hover:bg-gray-200": activeItem !== item,
                        }
                      )}
                    >
                      {item}
                    </li>
                  ) : (
                    <li key={item.title}>
                      <div
                        className="cursor-pointer"
                        onClick={() => toggleSubItems(item.title)}
                      >
                        {item.title}
                      </div>
                      {expandedItems.includes(item.title) && (
                        <ul className="ml-4 space-y-0">
                          {item.subItems?.map((subItem) => (
                            <li
                              key={subItem}
                              onClick={() => handleItemClick(subItem)}
                              className={classNames(
                                "cursor-pointer rounded-md transition-colors duration-300",
                                {
                                  "bg-gray-200 text-green-500":
                                    activeItem === subItem,
                                  "hover:bg-gray-200": activeItem !== subItem,
                                }
                              )}
                            >
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}

          <div className="mt-6 ml-2">
            <Button
              icon={
                <Image
                  src="/images/icons/image 2.png"
                  alt="Logout"
                  width={18}
                  height={18}
                />
              }
              label="Logout"
              className="p-button-danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
