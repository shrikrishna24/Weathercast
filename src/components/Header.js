import React, { useState, useEffect, useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import './Header.css';
import { FaChevronDown } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { BsTag } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineDownload } from 'react-icons/ai';
import Orderlist from './Orderlist';

export default function Header() {
  // To store json Data
  const [userData, setuserData] = useState([]);

  // To set and update table according to requested params as query
  const [searchedData, setsearchedData] = useState([]);

  // fetching Data via ./src/db.json
  const getUserdata = () => {
    fetch(' http://localhost:3001/users')
      .then((response) => response.json())
      .then((json) => {
        setuserData(json);
        setsearchedData(json);
      });
  };
  useEffect(() => {
    getUserdata();
  }, []);

  // filtereing the result
  const handleChange = (e) => {
    e.preventDefault();
    const searchedQuery = e.target.value.toLowerCase();

    if (searchedQuery === '') {
      setuserData(searchedData);
    } else {
      const filterResult = userData.filter((item) => {
        for (let key in item) {
          if (
            typeof item[key] === 'string' &&
            item[key].toLowerCase().includes(searchedQuery)
          ) {
            return true;
          }
        }
        return false;
      });

      setuserData(filterResult);
    }
  };

  // filtering status and description
  const handleSelect = (e) => {
    e.preventDefault();
    const selectedQuery = e.target.value.toLowerCase();

    if (selectedQuery === '') {
      setuserData(searchedData);
    } //
    else {
      const filterResult = searchedData.filter((item) => {
        for (let key in item) {
          if (
            typeof item[key] === 'string' &&
            item[key].toLowerCase().includes(selectedQuery)
          ) {
            return true;
          }
        }
        return false;
      });
      setuserData(filterResult);
    }
  };

  // exporting Data to Excel
  const tableRef = useRef(userData);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users Data',
    sheet: 'Orders',
  });

  return (
    <>
      <div className="header p-4">
        <form id="header-form">
          <div className="form-group">
            <input
              type="text"
              className="search mr-3 pl-5"
              placeholder="Search by any parameter..."
              onChange={handleChange}
            />
            <FiSearch className="search-icon mt-3 ml-2" size={22} />

            {/* status and description field */}
            <BsTag className="status-icon mt-3" size={22} />
            <select
              onChange={handleSelect}
              className="select-status pl-5"
              placeholder="status"
            >
              <option value="">Status</option>
              <option>Placed</option>
              <option>Delivered</option>
              <option>In transit</option>
              <option>Out for Delivery</option>
            </select>
            <FaChevronDown className="arrow-st mt-2" />

            <IoLocationOutline className="descp-icon mt-3" size={22} />
            <select
              className="select-distribution  pl-5"
              onChange={handleSelect}
            >
              <option value="">Distribution</option>
              <option>Mumbai</option>
              <option>Banglore</option>
              <option>Patna</option>
              <option>Pune</option>
              <option>Varansi</option>
              <option>Thane</option>
            </select>
            <FaChevronDown className="arrow-di" />

            <button
              onClick={(e) => {
                e.preventDefault();
                onDownload();
              }}
              className="btn btn-primary btn-lg pl-1 "
            >
              <AiOutlineDownload className="exp-icon mt-1 ml-3" size={23} />
              Export Orders
            </button>
          </div>
        </form>
      </div>

      {/* ORDER LIST  */}
      {userData.length === 0 ? (
        <h4>No results found.</h4>
      ) : (
        <Orderlist data={userData} tableRef={tableRef} />
      )}
    </>
  );
}
