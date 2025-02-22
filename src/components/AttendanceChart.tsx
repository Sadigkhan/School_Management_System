"use client";
import Image from "next/image";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 4000,
    absent: 2400,
  },
  {
    name: "Tue",
    present: 3000,
    absent: 1398,
  },
  {
    name: "Wed",
    present: 2000,
    absent: 9800,
  },
  {
    name: "Thu",
    present: 2780,
    absent: 3908,
  },
  {
    name: "Fri",
    present: 1890,
    absent: 4800,
  },
  {
    name: "Sat",
    present: 2390,
    absent: 3800,
  },
  {
    name: "Sun",
    present: 3490,
    absent: 4300,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounde-lg p-4 h-full">
      <div className="flex  justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="more-icon" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd"/>
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <Tooltip contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: 20, paddingBottom: 40 }}
          />
          <Bar dataKey="present" fill="#FAE27C" legendType="circle" radius={[10,10,0,0]}/>
          <Bar dataKey="absent" fill="#C3EBFA" legendType="circle" radius={[10,10,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
