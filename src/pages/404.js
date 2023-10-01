import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#EFF6FF]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Invalid URL
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          The URL you are trying to access is invalid.
        </Typography>
        <Typography color="blue" className="mt-1 font-normal">
          <Link href="/">Go Back</Link>
        </Typography>
      </Card>
    </div>
  );
}
