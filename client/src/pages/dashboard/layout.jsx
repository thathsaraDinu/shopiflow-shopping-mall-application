import Sidebar from '@/components/sidebar/sidebar';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Outlet } from 'react-router-dom';

function DasshboardLayout() {
  return (
    <>
      <div className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="py-7 px-8 bg-grey-50 grow">
          <div className="flex justify-between">
            <div className="relative grow">
              <Input
                id="search"
                className="text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500"
                placeholder="Search"
              />

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1.5 right-2.5"
              >
                <path
                  d="M21.7275 20.4093L16.9401 15.6226C16.697 15.3795 16.3534 15.3025 16.0431 15.3844L15.0159 14.3573C16.1747 13.0448 16.8845 11.3267 16.8845 9.44218C16.8845 5.33871 13.5462 2 9.44261 2C5.33847 2 1.99976 5.33871 1.99976 9.44285C1.99976 13.5467 5.33847 16.885 9.44261 16.885C11.3268 16.885 13.0449 16.1755 14.3577 15.0164L15.3848 16.0436C15.3029 16.354 15.3796 16.6972 15.6231 16.9406L20.4097 21.727C20.5921 21.9093 20.83 22 21.0686 22C21.3072 22 21.5454 21.909 21.7274 21.727C22.0911 21.3633 22.0911 20.7733 21.7274 20.4093L21.7275 20.4093ZM2.93168 9.44254C2.93168 5.85288 5.85211 2.93187 9.44236 2.93187C13.0326 2.93187 15.9527 5.85288 15.9527 9.44287C15.9527 13.0325 13.0319 15.9532 9.44236 15.9532C5.85277 15.9532 2.93168 13.0325 2.93168 9.44254Z"
                  fill="#5D6679"
                />
              </svg>
            </div>
            <div className="flex ml-2">
              <button className="mx-5 mt-1">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-grey-600 hover:text-blue-500"
                >
                  <path
                    d="M13.4417 19.5C13.2952 19.7525 13.0849 19.9622 12.8319 20.1079C12.5788 20.2536 12.292 20.3303 12 20.3303C11.708 20.3303 11.4212 20.2536 11.1681 20.1079C10.9151 19.9622 10.7048 19.7525 10.5583 19.5M17 8.66663C17 7.34054 16.4732 6.06877 15.5355 5.13109C14.5979 4.19341 13.3261 3.66663 12 3.66663C10.6739 3.66663 9.40215 4.19341 8.46447 5.13109C7.52678 6.06877 7 7.34054 7 8.66663C7 14.5 4.5 16.1666 4.5 16.1666H19.5C19.5 16.1666 17 14.5 17 8.66663Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button className="mr-2">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9999 2.00024C6.48613 2.00024 2 6.48637 2 12.0002C2 14.4655 2.89843 16.7233 4.38279 18.4684C4.4018 18.4977 4.4236 18.5254 4.44906 18.5509C4.45482 18.5567 4.46127 18.5603 4.46702 18.5657C6.30174 20.6679 8.99734 21.9999 12 21.9999C15.0027 21.9999 17.6982 20.6679 19.533 18.5657C19.5387 18.5605 19.5455 18.5565 19.5509 18.5509C19.5764 18.5254 19.5984 18.4974 19.6172 18.4684C21.1016 16.7232 22 14.4652 22 12.0002C22 6.48637 17.5139 2.00024 12.0001 2.00024H11.9999ZM11.9999 21.0001C9.44414 21.0001 7.13567 19.9276 5.49595 18.2111L6.18095 17.5261C6.84273 16.8645 7.72232 16.5001 8.65758 16.5001H15.3424C16.2776 16.5001 17.1572 16.8646 17.8188 17.526L18.5038 18.211C16.8642 19.9274 14.5557 21.0001 11.9998 21.0001H11.9999ZM19.1561 17.4493L18.5259 16.8191C17.6754 15.9686 16.5449 15.5 15.3424 15.5H8.65758C7.455 15.5 6.32465 15.9686 5.47417 16.8191L4.84395 17.4493C3.68829 15.9356 2.99999 14.047 2.99999 12.0002C2.99999 7.03775 7.03719 3.00028 11.9999 3.00028C16.9624 3.00028 20.9999 7.03748 20.9999 12.0002C20.9999 14.0472 20.3116 15.9357 19.1561 17.4493H19.1561ZM11.9999 6.50025C9.79449 6.50025 7.99986 8.29466 7.99986 10.5003C7.99986 12.7057 9.79427 14.5004 11.9999 14.5004C14.2054 14.5004 16 12.706 16 10.5003C16 8.29466 14.2054 6.50025 11.9999 6.50025ZM11.9999 13.5002C10.3457 13.5002 8.99999 12.1545 8.99999 10.5003C8.99999 8.84604 10.3457 7.50034 11.9999 7.50034C13.6541 7.50034 14.9999 8.84608 14.9999 10.5003C14.9999 12.1545 13.6541 13.5002 11.9999 13.5002Z"
                    fill="#5D6679"
                  />
                </svg>
              </button>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DasshboardLayout;
