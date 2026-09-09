import { ApiResponse } from "../utils/api-response.js";
import asyncHanlder from "../utils/async-handler.js";

// const healthcheck = (req, res) => {
//   try {
//     res
//       .status(200)
//       .json(new ApiResponse(200, { message: "Server is running " }));
//   } catch (error) {
//     console.log("Healthcheck controller failed", error);
//   }
// };

const healthcheck = asyncHanlder(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "Server is running " }));
});

export default healthcheck;
