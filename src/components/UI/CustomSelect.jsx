import React, { useState } from "react";

function CustomSelect({
  placeholder,
  options,
  selectValue,
  value,
  isStatic,
  required
}) {
  let [isVisible, setVisible] = useState(false);
  let [inputValue, setValue] = useState(value);
  let [errors, setErrors] = useState("");
  return (
    <div
      className="pos-cont  wi-80p "
      onMouseEnter={e => {
        // console.log("triggered", isVisible);
        setVisible(true);
      }}
      onMouseLeave={e => {
        // console.log("triggered", isVisible);
        setVisible(false);
      }}
    >
      <input
        className="form-inp cu-po wi-100p"
        type="customselect"
        name="customselecct"
        id="fname"
        value={inputValue.replace(/\d+/, "")}
        placeholder={placeholder}
        autoComplete={false}
        autoCorrect={false}
        autoSave={false}
        required={required}
        readOnly={isStatic}
        onChange={e => {
          setVisible(true);
          if (!options.some(option => option !== e.target.value))
            setErrors("Enter a valid option");
          setValue(e.target.value);
        }}
      />
      {errors ? <p className="form-hint">{errors}</p> : null}
      <div className="pos-abs-top-left z-3">
        <ul>
          {isVisible
            ? !isStatic
              ? options
                .filter(option => option.includes(inputValue))
                .map(correctOption => (
                  <li
                    key={correctOption}
                    onClick={e => {
                      selectValue(correctOption);
                      setErrors("");
                      setValue(correctOption);
                      setVisible(!isVisible);
                    }}
                    className="option-cust bg-light cu-po wi-100p"
                  >
                    {correctOption.replace(/\d+/, "")}
                  </li>
                ))
              : options.map(correctOption => (
                <li
                  onClick={e => {
                    selectValue(correctOption);
                    setValue(correctOption);
                    setVisible(!isVisible);
                  }}
                  key={correctOption}
                  className="option-cust bg-light cu-po wi-100p"
                >
                  {correctOption.replace(/\d+/, "")}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default CustomSelect;
