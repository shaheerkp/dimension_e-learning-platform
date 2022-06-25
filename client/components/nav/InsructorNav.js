import { Affix } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <div className="flex-colum nav-pills mt-2 ">
      
      <Link href="/instructor">
        <a
          className={`text-white bg-blue nav-link ${
            current == "/instructor" && "active"
          }`}
        >
          Dashboard
        </a>
      </Link>

      <Link href="/instructor/course/create">
        <a
          className={`text-white bg-blue nav-link ${
            current == "/instructor/course/create" && "active"
          }`}
        >
          Create Course
        </a>
      </Link>
    </div>
  );
};

export default InstructorNav;
