import React, { useState } from "react";
import { Table } from "antd";
import { ITableProps } from "@/global/interface";

const HocTable: React.FC<ITableProps> = ({ columns }) => {
  const [data] = useState([]);
  return <Table columns={columns} dataSource={data} />;
};

// https://juejin.im/post/6844904017492082702
export default HocTable;
