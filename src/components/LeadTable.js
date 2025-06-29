import React, {  useState } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./LeadTable.css";

// "https://mapi.indiamart.com/wservce/crm/crmListing/v2/?glusr_crm_key=mR20E7ht5XzGQPep532C7lqIolXFnjlq&start_time=08-Jan-2022&end_time=15-Jan-2022" 
mRy2E7hl5X/BSvep4naC7lqIolXFnjlq
const baseURL =
  "https://mapi.indiamart.com/wservce/crm/crmListing/v2/?glusr_crm_key=mRy2E7hl5X/BSvep4naC7lqIolXFnjlq";

const LeadTable = () => {
  const [leadData, setLeadData] = useState([]);
  const [toselectedDate, setToSelectedDate] = useState(null);
  const [fromselectedDate, setFromSelectedDate] = useState(null);

  const currentLead = () => {
    
    async function getLeads() {
      const request = await axios.get(baseURL);
      console.log(request.data.RESPONSE);
      setLeadData(request.data.RESPONSE);
    }

    getLeads();
  };
  const handleClick = () => {
    const toDate = moment(toselectedDate).format("DD-MMM-YYYY");
    const fromDate = moment(fromselectedDate).format("DD-MMM-YYYY");
    console.log(toDate, fromDate);
    
    if (
      moment(fromDate).format("YYYYMMDD") - moment(toDate).format("YYYYMMDD") >
      7
    ) {
      alert("Please Select Only 7 days, Otherwise it Won't work");
    } else {
      async function getLeads() {
        const request = await axios.get(
          `${baseURL}&start_time=${toDate}&end_time=${fromDate}`,
        );
        console.log(request.data.RESPONSE);
        setLeadData(request.data.RESPONSE);
      }

      getLeads();
    }
  };




  return (
    <div>
      <div class="alert alert-primary" role="alert">
        Please Select Only 7 days, Otherwise it Won't work And Please press the leads button once in every 5 minutes
      </div>
      <div className="topbox container d-flex justify-content-center align-items-center">
        <div className="d-flex leadsPicker">
          <DatePicker
            wrapperClassName="datePicker"
            selected={toselectedDate}
            onChange={(date) => setToSelectedDate(date)}
            dateFormat="dd/MMM/yyyy"
            value={toselectedDate}
            isClearable
            scrollableMonthYearDropdown
            showYearDropdown
            showMonthDropdown
          />
          <span>To</span>
          <DatePicker
            wrapperClassName="datePicker"
            selected={fromselectedDate}
            onChange={(date) => setFromSelectedDate(date)}
            value={fromselectedDate}
            dateFormat="dd/MMM/yyyy"
            isClearable
            scrollableMonthYearDropdown
            showYearDropdown
            showMonthDropdown
          />
          <div className="d-grid gap-2 d-md-block leadBtnGrp">
            <button className="btn btn-primary m-1" onClick={handleClick}>
              Get Leads
            </button>
            <button className="btn btn-primary m-1" onClick={currentLead}>
              Get Current Leads
            </button>
          </div>
        </div>
        <ReactHTMLTableToExcel
          className="btn btn-success m-1"
          table="leadstable"
          filename="Leads Excel File"
          sheet="sheet"
          buttonText="Export to Excel"
        />
       
      </div>
      <table className="table" id="leadstable">
        <thead>
          <tr className="table-dark">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
            <th scope="col">Product</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">Subject</th>
            <th scope="col">Date & Time</th>
          </tr>
        </thead>

        <tbody>
          { leadData.map((data) => {
                return (
                  <tr>
                    <th key={data.UNIQUE_QUERY_ID} scope="row">
                      1
                    </th>
                    <td>{data.SENDER_NAME}</td>
                    <td>{data.SENDER_MOBILE}</td>
                    <td>{data.SENDER_EMAIL}</td>
                    <td>{data.QUERY_PRODUCT_NAME}</td>
                    <td>{data.SENDER_STATE}</td>
                    <td>{data.SENDER_CITY}</td>
                    <td>{data.SUBJECT}</td>
                    <td>{data.QUERY_TIME}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
