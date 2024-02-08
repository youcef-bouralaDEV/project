import Breadcrumbs from "./Breadcrumbs";

const Header = ({ category, title }) => (
  <div className="flex items-center justify-between md:mt-10 md:mb-6 mt-5 md:p-4 bg-white rounded-3xl">

    <div className=" mb-1">
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
    </div>
   <Breadcrumbs/>
  </div>
);

export default Header;
