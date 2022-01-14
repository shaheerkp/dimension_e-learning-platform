import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <div className="nav flex-colum nav-pills mt-2">
      <Link href="/instructor">
        <a className={`nav-link ${current == "/instructor" && "active"}`}>
          Dashboard
        </a>
      </Link>
      <br />
      <Link href="/instructor/course/create">
        <a
          className={`nav-link ${
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