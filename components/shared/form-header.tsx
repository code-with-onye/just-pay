import React from "react";

type headerProps = {
  title: string;
  description: string;
};
export const FormHeader = ({ title, description }: headerProps) => {
  return (
    <div className="my-4 flex flex-col ">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};
