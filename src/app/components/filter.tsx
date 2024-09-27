import React from "react";

const Filter: React.FC = () => {
  return (
    <div>
      <div className="w-[123.89px] h-[26.46px] left-[729.11px] top-[80.37px] absolute">
        <div className="w-[89.27px] h-[26.46px] left-0 top-0 absolute bg-[#3f9758] rounded-md"></div>
        <div className="w-[123.89px] left-[-0px] top-[5.29px] absolute text-black text-sm font-bold font-['Inter']">
          Apply filter
        </div>
      </div>
      <div className="w-[105.84px] h-[75.85px] left-[271.65px] top-[54.09px] absolute">
        <div className="w-[104.66px] h-[17.64px] left-[1.18px] top-[10.58px] absolute text-black text-sm font-bold font-['Inter']">
          tag id
        </div>
        <div className="w-[91.14px] h-[27.64px] left-[-0px] top-[36.46px] absolute bg-[#d9d9d9]"></div>
        <div className="w-[75.87px] h-[0px] left-[104.07px] top-[-0px] absolute origin-top-left rotate-[88.67deg] border border-[#d1cdcd]"></div>
      </div>
      <div className="w-[105.84px] h-[75.85px] left-[388.66px] top-[54.09px] absolute">
        <div className="w-[104.66px] h-[17.64px] left-[1.18px] top-[10.58px] absolute text-black text-sm font-bold font-['Inter']">
          Species
        </div>
        <div className="w-[91.14px] h-[27.64px] left-0 top-[36.46px] absolute bg-[#d9d9d9]"></div>
        <div className="w-[75.87px] h-[0px] left-[104.07px] top-0 absolute origin-top-left rotate-[88.67deg] border border-[#d1cdcd]"></div>
      </div>
      <div className="w-[105.84px] h-[75.85px] left-[507.43px] top-[54.09px] absolute">
        <div className="w-[104.66px] h-[17.64px] left-[1.18px] top-[10.58px] absolute text-black text-sm font-bold font-['Inter']">
          Location
        </div>
        <div className="w-[91.14px] h-[27.64px] left-[-0px] top-[36.46px] absolute bg-[#d9d9d9]"></div>
        <div className="w-[75.87px] h-[0px] left-[104.07px] top-0 absolute origin-top-left rotate-[88.67deg] border border-[#d1cdcd]"></div>
      </div>
    </div>
  );
};

export default Filter;
