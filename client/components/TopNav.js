import { Menu } from "antd";
import Link from "next/link";
import {
  LoginOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import icon from "../public/images/die.jpg";
import { useState, useEffect } from "react";

const { Item } = Menu;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function TopNav() {
  const [current, setCurrent] = useState(false);
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <Menu
      className="text-white"
      style={{
        backgroundColor: "#303030",
        fontFamily: "serif",
        fontSize: "20px",
        padding: "10px",
      }}
      theme="dark"
      mode="horizontal"
      selectedKeys={current}
    >
      <Item key="/logo" onClick={(e) => setCurrent(e.key)}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            marginLeft: "15px",
          }}
        >
          <Image width={40} height={40} src={icon} />
        </div>
      </Item>

      <Item key="/"
        onClick={(e) => setCurrent(e.key)}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5px",
          marginLeft: "-25px",
        }}
      >
        <Link href="/">
          <a className="text-white">DIMENSIONS</a>
        </Link>
      </Item>

      <Item
        key="/instructor"
        onClick={(e) => setCurrent(e.key)}
        icon={
          <UserAddOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />
        }
      >
        <Link href="/instructor">
          <a className="text-white">Became Instructor</a>
        </Link>
      </Item>

      <Item
        key="/login"
        onClick={(e) => setCurrent(e.key)}
        style={{ marginLeft: "auto" }}
        icon={<LoginOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />}
      >
        <Link href="/login">
          <a className="text-white">Login</a>
        </Link>
      </Item>
      <Item
        key="/register"
        onClick={(e) => setCurrent(e.key)}
        icon={<UserOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />}
      >
        <Link href="/register">
          <a className="text-white">Register</a>
        </Link>
      </Item>
    </Menu>
  );
}

export default TopNav;
