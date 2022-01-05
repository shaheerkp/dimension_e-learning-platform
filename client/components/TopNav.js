import { Menu } from "antd";
import Link from "next/link";
import {
  LoginOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import icon from "../public/images/die.jpg";

const { Item } = Menu;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function TopNav() {
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
    >
      <Item>
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

      <Item
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
        icon={
          <UserAddOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />
        }
      >
        <Link href="/">
          <a className="text-white">Became Instructor</a>
        </Link>
      </Item>

      <Item style={{marginLeft: 'auto'}} 
        icon={<LoginOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />}
      >
        <Link href="/login">
          <a className="text-white">Login</a>
        </Link>
      </Item>
      <Item 
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
