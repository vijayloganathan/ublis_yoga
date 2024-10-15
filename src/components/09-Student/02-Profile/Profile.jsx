export default function Profile({ toggleCustomerNavbar }) {
  return (
    <div>
      <div className="w-[100%] mt-3 flex justify-between lg:justify-center items-center bg-[#f95005] rounded h-[60px]">
        <div className="text-[#fff] font-bold text-[20px] pl-3 lg:pl-0">
          <i className="fa-solid fa-user"></i>
          &nbsp;&nbsp;&nbsp;Profile
        </div>
        <div className="block lg:hidden pr-2 lg:pr-0">
          <button
            className="px-2 text-[28px] text-[#fff]"
            onClick={toggleCustomerNavbar}
          >
            <i class="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
