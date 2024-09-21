import React from "react";
import { Link } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Home = () => {
  const data = [
    {
      name: "FY A",
      CyberOne: 4000,
      AgriSeries: 2400,
      amt: 2400,
    },
    {
      name: "FY B",
      CyberOne: 3000,
      AgriSeries: 1398,
      amt: 2210,
    },
    {
      name: "FY C",
      CyberOne: 7800,
      AgriSeries: 2000,
      amt: 2290,
    },
    {
      name: "FY D",
      CyberOne: 2780,
      AgriSeries: 3908,
      amt: 2000,
    },
    {
      name: "FY E",
      CyberOne: 1890,
      AgriSeries: 4800,
      amt: 2181,
    },
    {
      name: "FY F",
      CyberOne: 2390,
      AgriSeries: 3800,
      amt: 2500,
    },
    {
      name: "FY G",
      CyberOne: 3490,
      AgriSeries: 4300,
      amt: 2100,
    },
  ];

  return (
    <main
      className="main-container"
      style={{
        backgroundImage: `url("file:///C:/Users/ayushi/Desktop/PartnerPortal/Admin/src/images/3.png")`,
        backgroundSize: "cover",
      }}
    >
      <div className="main-title" style={{ color: "black" }}>
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <Link
            to="/store"
            className="card-inner"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>Products</h3>
            <BsFillArchiveFill className="card_icon" />
          </Link>
        </div>

        <div className="card">
          <Link
            to="/order"
            className="card-inner"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>Orders</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </Link>
        </div>
        <div className="card">
          <Link
            to="/partnerregisterationdetails"
            className="card-inner"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3> Company KYC</h3>
            <BsPeopleFill className="card_icon" />
          </Link>
        </div>

        <div className="card">
          <Link
            to="/announce"
            className="card-inner"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>Announcements</h3>
            <BsFillBellFill className="card_icon" />
          </Link>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="AgriSeries" fill="#82ca9d" />
            <Bar dataKey="CyberOne" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="AgriSeries"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="CyberOne" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default Home;
