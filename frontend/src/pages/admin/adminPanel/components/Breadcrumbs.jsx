// import { Link, useLocation } from "react-router-dom";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { IoMdHome } from "react-icons/io";

// const Breadcrumbs = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split("/").filter((x) => x);

//   // If on the home page, don't render the breadcrumbs
//   if (location.pathname === "/admin/home") {
//     return null;
//   }
//   const shouldExcludeAdmin = pathnames[0] === "admin";

//   return (
//     <div className="flex items-center text-gray-500">
//     <Link to="/" className="flex items-center space-x-1 text-blue-500">
//       <IoMdHome className="text-xl" />
//       <span>Home</span>
//     </Link>

//     {pathnames.map((name, index) => {
//       const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
//       const isLast = index === pathnames.length - 1;
//       if (shouldExcludeAdmin && index === 0) {
//         return null; // Exclude "admin" from breadcrumbs
//       }

//       return (
//         <div key={index}>
//           <MdKeyboardArrowRight className="text-gray-400 text-lg" />
//           {isLast ? (
//             <span className="font-medium">{name}</span>
//           ) : (
//             <Link to={routeTo} className="flex items-center space-x-1 text-blue-500">
//               <MdKeyboardArrowRight className="text-gray-400 text-lg" />
//               <span>{name}</span>
//             </Link>
//           )}
//         </div>
//       );
//     })}
//   </div>
//   );
// };

// export default Breadcrumbs;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";

const Breadcrumbs = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    const generatedBreadcrumbs = pathSegments
      .map((segment, index) => {
        // Skip "admin" path
        if (segment.toLowerCase() === "admin" && index === 0) {
          return null;
        }

        const path =
          index === 0
            ? `/${segment}`
            : `/${pathSegments.slice(0, index + 1).join("/")}`;
        return { label: segment, path };
      })
      .filter((breadcrumb) => breadcrumb !== null);

    // Use functional update to ensure you have the latest state
    const homeBreadcrumb = { label: "Home", path: "/" };
    setBreadcrumbs([homeBreadcrumb, ...generatedBreadcrumbs]);

    // console.log(pathSegments);
    // console.log(generatedBreadcrumbs);
  }, [location.pathname]);

  // Check if the current route is the home page
  const isHomePage = location.pathname === "/admin/home";

  // Render breadcrumbs only if not on the home page
  return (
    <div>
      {!isHomePage && (
        <nav
          className="flex justify-center items-center px-14 py-3"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center">
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <li className="inline-flex items-center">
                  <Link
                    to={breadcrumb.path}
                    className="inline-flex items-center font-md  text-sm  text-gray-700 hover:text-orange-500 "
                  >
                    {index === breadcrumbs.length - 1 ? (
                      <span>{breadcrumb.label}</span>
                    ) : (
                      <>
                        <span>{breadcrumb.label}</span>
                        <FaGreaterThan className=" text-gray-600 mx-2" />
                      </>
                    )}
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumbs;
