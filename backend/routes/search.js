

// // import express from "express";
// // import Product from "../models/productModel.js";

// // const router = express.Router();

// // // Smart Search API
// // router.get("/", async (req, res) => {
// //   try {
// //     const { search, category } = req.query;

// //     if (!search) {
// //       return res.status(400).json({ message: "Search query is required" });
// //     }

// //     // Fuzzy Search with basic typo tolerance
// //     const searchRegex = new RegExp(search.split("").join(".*"), "i");

// //     // Construct Search Query with category filter
// //     let searchCriteria = {
// //       $and: [
// //         {
// //           $or: [
// //             { name: { $regex: searchRegex, $options: "i" } },
// //             { type: { $regex: searchRegex, $options: "i" } },
// //             { show: { $regex: searchRegex, $options: "i" } },
// //             { seller: { $regex: searchRegex, $options: "i" } }
// //           ],
// //         }
// //       ],
// //     };

// //     // Apply category filter if it's not "All"
// //     if (category && category !== "All") {
// //       searchCriteria.$and.push({ type: category });
// //     }

// //     const searchResults = await Product.find(searchCriteria)
// //       .select("name type show seller image price rating description");

// //     res.json(searchResults);
// //   } catch (error) {
// //     console.error("Search error:", error);
// //     res.status(500).json({ message: "Error searching products", error });
// //   }
// // });

// // export default router;

// import express from "express";
// import Product from "../models/productModel.js";

// const router = express.Router();

// // Smart Search API
// router.get("/", async (req, res) => {
//   try {
//     const { search, category } = req.query;

//     let searchCriteria = {};

//     if (search) {
//       // Fuzzy Search with basic typo tolerance
//       const searchRegex = new RegExp(search.split("").join(".*"), "i");
      
//       searchCriteria = {
//         $and: [
//           {
//             $or: [
//               { name: { $regex: searchRegex, $options: "i" } },
//               { type: { $regex: searchRegex, $options: "i" } },
//               { show: { $regex: searchRegex, $options: "i" } },
//               { seller: { $regex: searchRegex, $options: "i" } }
//             ],
//           }
//         ],
//       };

//       // Apply category filter if it's not "All"
//       if (category && category !== "All") {
//         searchCriteria.$and.push({ type: category });
//       }
//     }

//     // Fetch all products if no search query is provided
//     const searchResults = await Product.find(searchCriteria)
//       .select("name type show seller image price rating description");

//     res.json(searchResults);
//   } catch (error) {
//     console.error("Search error:", error);
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// });

// export default router;
