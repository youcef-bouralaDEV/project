import AdminBreadcrumbs from "./AdminBreadcrumbs";
import ClientDashBoard from "../../../client-Side/pages/ClientDashBoard";
import ClientBreadcrumbs from "../../../client-Side/components/ClientBreadcrumbs";

const Header = ({ category, title, role }) => {
  let BreadcrumbsComponent;

  if (role === "admin") {
    BreadcrumbsComponent = AdminBreadcrumbs;
  } else {
    BreadcrumbsComponent = ClientBreadcrumbs
  }

  return (
    <div className=" flex items-center justify-between mx-auto md:mt-10 md:mb-6 mt-5 md:p-4 bg-white font-poppins rounded-3xl">
      <div className="mb-1">
        <p className="text-lg text-gray-400">{category}</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </p>
      </div>

      <BreadcrumbsComponent />
    </div>
  );
};

export default Header;
