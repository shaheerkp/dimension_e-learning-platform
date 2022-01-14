import { Menu } from "antd";
import Link from "next/link";
import {
  LoginOutlined,
  UserOutlined,
  UserAddOutlined,
  CoffeeOutlined,
  DashboardOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import icon from "../public/images/die.jpg";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";

const { Item } = Menu;
const SubMenu = Menu.SubMenu;
const ItemGroup = Menu.ItemGroup;

function TopNav() {
  const [current, setCurrent] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  //logout
  const logout = async (e) => {
    setCurrent(e.key);
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("User");
    const { data } = await axios.get("/api/signout");
    console.log("logout", data);
    alert(data.msg);
    router.push("/login");
  };

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

      <Item
        key="/"
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
      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={
            <CarryOutOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />
          }
        >
          <Link href="/instructor/course/create">
            <a className="text-white">Create Course</a>
          </Link>
        </Item>
      ) : (
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={
            <UserAddOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />
          }
        >
          <Link href="/user/become-instructor">
            <a className="text-white">Become Instructor</a>
          </Link>
        </Item>
      )}

      {user === null ? (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            style={{ marginLeft: "auto" }}
            icon={
              <LoginOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />
            }
          >
            <Link href="/login">
              <a className="text-white">Login</a>
            </Link>
          </Item>
          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={
              <UserOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />
            }
          >
            <Link href="/register">
              <a className="text-white">Register</a>
            </Link>
          </Item>
        </>
      ) : (
        <SubMenu
          style={{ marginLeft: "auto" }}
          title={user.name}
          icon={
            <CoffeeOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />
          }
        >
          <ItemGroup>
            <Item
              icon={
                <DashboardOutlined
                  style={{ color: "#73FBFD", fontSize: "20px" }}
                ></DashboardOutlined>
              }
              key="/user"
            >
              <Link href="/user">
                <a>Dashboard</a>
              </Link>
            </Item>
            {user && user.role && user.role.includes("Instructor") && (
              <Item
                icon={
                  <DashboardOutlined
                    style={{ color: "#73FBFD", fontSize: "20px" }}
                  ></DashboardOutlined>
                }
                key="/instructor"
              >
                <Link href="/instructor">
                  <a>Instructor Dashboard</a>
                </Link>
              </Item>
            )}

            <Item
              key="/login"
              onClick={logout}
              icon={
                <LoginOutlined style={{ color: "#73FBFD", fontSize: "20px" }} />
              }
            >
              <Link href="/login">
                <a className="text-white">Logout</a>
              </Link>
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
}

export default TopNav;
