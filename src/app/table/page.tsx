"use client";

import dynamic from "next/dynamic";

const TablePage = dynamic(() => import("./ClientTable"), { ssr: false });

export default TablePage;