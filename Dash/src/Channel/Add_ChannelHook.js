// import axios from "axios";

// const addChannelAPI = async (payload) => {
//   try {
//     const response = await axios.post(
//       "http://172.16.130.8:6060/collect/bundle/insert-channel",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const resData = response.data;
//     console.log("Response Data:", resData);

//     if (resData?.STATUS === "true") {
//       return {
//         success: true,
//         message: resData.MESSAGE || "Channel added successfully",
//       };
//     } else {
//       return {
//         success: false,
//         message: resData.MESSAGE || "Failed to add channel",
//       };
//     }
//   } catch (error) {
//     console.error("API Error:", error);
//     return { success: false, message: "Failed to add channel" };
//   }
// };

// export default addChannelAPI;

import axios from "axios";

const addChannelAPI = async (payload) => {
  try {
    const response = await axios.post(
      "http://172.16.130.8:6060/collect/bundle/insert-channel",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = response.data;
    console.log("Response Data:", resData);

    return { success: true, data: resData };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, data: { STATUS: "false", MESSAGE: "API call failed" } };
  }
};

export default addChannelAPI;

 