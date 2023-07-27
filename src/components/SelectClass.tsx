import React from "react";


interface SelectClassProps {
  title: string;
  flag: boolean;
}
const SelectClass = ({ title, flag }: SelectClassProps) => {
  return (
    <label htmlFor="selectClass" className="my-5">
      <p className="small-title">{title}<span className="text-primary-300">*</span></p>
      {
        flag ? 
        <select className="input-select" name="selectClass" id="selectClass">
          <option value="수강권1">수강권1</option>
          <option value="수강권2">수강권2</option>
        </select> : 
        <select className="input-select" name="" id="" disabled>
          <option value="disabledOption">수업(수강권)을 선택해 주세요</option>
        </select>
      }
      <p className="text-primary-300">예약 가능 잔여 횟수: {}회</p>
    </label>
  )
}

export default SelectClass