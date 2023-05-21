import React, { useState } from 'react';
import './Orderlist.css';

export default function Orderlist(props) {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // To select all rows
  const handleSelectAll = (e) => {
    const checked = e.target.checked;

    const updatedCheckedItems = {}; //checking updated checkbox

    for (const item of props.data) {
      updatedCheckedItems[item.id] = checked;
    }

    setSelectAll(checked);
    setCheckedItems(updatedCheckedItems);
  };

  //To check the changes made in checkboxes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = {
        ...prevCheckedItems,
        [value]: checked,
      };
      return updatedCheckedItems;
    });
    setSelectAll(Object.values(checkedItems).every((item) => item === true));
  };

  // getting count of number of checkbox is selected
  const getCount = () => {
    let count = 0;
    for (const item of props.data) {
      if (checkedItems[item.id] === true) {
        count++;
      }
    }
    return count;
  };

  return (
    <form className="form-check mt-4 ml-2">
      <table ref={props.tableRef}>
        <thead>
          <tr>
            <th>
              <input
                id="flexCheckDefault"
                name="checkboxes"
                className="ml-2 checked"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>
              <p>
                ALL ORDER <span>({getCount()} order selected)</span>
              </p>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="heading-row">
            <th>
              <input value="none" className="invisible ml-2" type="checkbox" />
            </th>
            <td>Ref.ID</td>
            <td>Customer</td>
            <td>Product(s)</td>
            <td>Date</td>
            <td>Distribution</td>
            <td>Status</td>
            <td>Price(in Rs.)</td>
          </tr>

          {/* Rendering Data in Table  */}
          {props.data.map((item) => {
            const rowStyle = {
              fontWeight: checkedItems[item.id] ? 500 : 400,
            };
            return (
              <tr key={item.id} style={rowStyle}>
                <th>
                  <input
                    value={item.id}
                    className="checked mt-1 mr-3 ml-2"
                    type="checkbox"
                    checked={checkedItems[item.id] || false}
                    onChange={handleCheckboxChange}
                  />
                </th>
                <td>{item.ref_ID}</td>
                <td>{item.Customer}</td>
                <td>{item.products}</td>
                <td>{item.Date}</td>
                <td>{item.Distribution}</td>
                <td>{item.status}</td>
                <td>{item.Price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </form>
  );
}
