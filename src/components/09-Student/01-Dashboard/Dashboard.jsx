export default function Dashboard({ toggleCustomerNavbar }) {

  return (
    <div>
      <div className="w-[100%] mt-3 flex justify-between lg:justify-center items-center bg-[#f95005] rounded h-[60px]">
        <div className="text-[#fff] font-bold text-[20px] pl-3 lg:pl-0">
          <i className="fa-solid fa-chart-line"></i>
          &nbsp;&nbsp;&nbsp;Dashboard
        </div>
        <div className="block lg:hidden pr-2 lg:pr-0">
          <button
            className="px-2 text-[28px] text-[#fff]"
            onClick={toggleCustomerNavbar}
          >
            <i className="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="w-[100%] py-6 flex flex-wrap gap-x-5">
        <div
          className="w-[300px] h-[200px] bg-[#f5f7f8] flex justify-center items-center shadow-sm rounded"
          align="center"
        >
          <div className="w-[90%] h-[180px] flex flex-col items-start justify-start">
            <div className="text-[#000] text-[20px] font-bold">Attendance</div>
            <div className="w-[100%] py-4" align="start">
              <div className="text-[#f95005] text-[20px] font-semibold">
                Class Timing
              </div>
              <div className="text-[#000] text-[18px] font-semibold">
                10.00 AM - 11.00 AM
              </div>
            </div>
            <div className="text-[18px] text-[#fff] font-bold bg-[#f95005] w-[100%] py-2 rounded">
              Attended
            </div>
          </div>
        </div>

        <div
          className="w-[300px] h-[200px] bg-[#f5f7f8] flex justify-center items-center shadow-sm rounded"
          align="center"
        >
          <div className="w-[90%] h-[180px] flex flex-col items-start justify-start">
            <div className="text-[#000] text-[20px] font-bold">Fees</div>
            <div className="w-[100%] py-4" align="start">
              <div className="text-[#f95005] text-[20px] font-semibold">
                Class Timing
              </div>
              <div className="text-[#000] text-[18px] font-semibold">
                10.00 AM - 11.00 AM
              </div>
            </div>
            <div className="text-[18px] text-[#fff] font-bold bg-[#f95005] w-[100%] py-2 rounded">
              Attended
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
