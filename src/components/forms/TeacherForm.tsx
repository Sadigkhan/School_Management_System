"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username Must be at least 3 characters long!" })
    .max(20, { message: "Username Must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid Email Address!" }),
  password: z
    .string()
    .min(8, { message: "Password Must be at least 8 characters long!" }),
  firstName: z
    .string()
    .min(3, { message: "First Name Must be at least 3 characters long!" })
    .max(20, { message: "First Name Must be at most 20 characters long!" }),
  lastName: z
    .string()
    .min(3, { message: "Last Name Must be at least 3 characters long!" })
    .max(20, { message: "Last Name Must be at most 20 characters long!" }),
  phone: z
    .string()
    .min(10, { message: "Phone Number Must be at least 10 characters long!" })
    .max(20, { message: "Phone Number Must be at most 20 characters long!" }),
  address: z
    .string()
    .min(3, { message: "Address Must be at least 3 characters long!" }),
  birtDay: z.date({ message: "Invalid Date!" }),
  sex: z.enum(["male", "female"], { message: "Invalid Gender!" }),
  image: z.instanceof(File, { message: "Invalid Image!" }),
});

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Teacher</h1>
      <span className="text-xs text-gray-500 font-medium">
        Authentication Information
      </span>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          {...register("username")}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
        />
        {errors.username && (
          <span className="text-xs text-red-500 font-medium">
            {errors.username?.message?.toString()}
          </span>
        )}
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
      {/* <input type="text" {...register("firstName")} />
        <input type="text" {...register("lastName")} />
        <input type="text" {...register("phone")} />
        <input type="text" {...register("address")} />
        <input type="text" {...register("birtDay")} />
        <input type="text" {...register("sex")} /> */}
    </form>
  );
};

export default TeacherForm;
