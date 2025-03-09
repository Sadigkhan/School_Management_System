"use server";

import { revalidatePath } from "next/cache";
import { ClassSchema, SubjectSchema, TeacherSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = { success: boolean; error: boolean };

//Subject Actions
export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers:{
          connect:data.teachers.map(teacherId=>({id:teacherId}))
        }
      },
    });

    return { success: true, error: false };
  } catch (error) {
    return { success: false, error: true };
  }
};

export const updateSubject = async (
    currentState: CurrentState,
    data: SubjectSchema
  ) => {
    try {
      await prisma.subject.update({
        where:{
            id:data.id
        },
        data: {
          name: data.name,
          ...(data.teachers && {
            teachers: {
              set: data.teachers.map((teacherId) => ({ id: teacherId })), // Connect by ID
            },
          }),
        },
      });
  
      return { success: true, error: false };
    } catch (error) {
        console.log(error)
      return { success: false, error: true };
    }
  };

export const deleteSubject = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
    try {
      await prisma.subject.delete({
        where:{
            id:parseInt(id)
        },
      });
  
      return { success: true, error: false };
    } catch (error) {
      return { success: false, error: true };
    }
};

//Class Actions
export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });

    return { success: true, error: false };
  } catch (error) {
    return { success: false, error: true };
  }
};

export const updateClass = async (
    currentState: CurrentState,
    data: ClassSchema
  ) => {
    try {
      await prisma.class.update({
        where:{
            id:data.id
        },
        data
      });
  
      return { success: true, error: false };
    } catch (error) {
        console.log(error)
      return { success: false, error: true };
    }
  };

export const deleteClass = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
    try {
      await prisma.class.delete({
        where:{
            id:parseInt(id)
        },
      });
  
      return { success: true, error: false };
    } catch (error) {
      return { success: false, error: true };
    }
};

//Teacher Actions
export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {

    const clerk = await clerkClient();
    const user = await clerk.users.createUser({
      username:data.username,
      password:data.password,
      firstName:data.name,
      lastName:data.surname,
      publicMetadata:{role:"teacher"}

    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        image: data.image || null,
        bloodType: data.bloodType,
        gender: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (error) {
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
  ) => {

    if (!data.id) {
      return { success: false, error: true };
    }

    try {
      const clerk = await clerkClient();
      const user = await clerk.users.updateUser(data.id, {
        username: data.username,
        ...(data.password !== "" && { password: data.password }),
        firstName: data.name,
        lastName: data.surname,
      });

      await prisma.teacher.update({
        where: {
          id: data.id,
        },
        data: {
          // ...(data.password !== "" && { password: data.password }),
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null,
          address: data.address,
          image: data.image || null,
          bloodType: data.bloodType,
          gender: data.sex,
          birthday: data.birthday,
          subjects: {
            set: data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })),
          },
        },
      });

      
      return { success: true, error: false };
    } catch (error) {
        console.log(error)
      return { success: false, error: true };
    }
};

export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
    try {
      const clerk = await clerkClient();
      await clerk.users.deleteUser(id);
      await prisma.teacher.delete({
        where:{
            id:id
        },
      });
  
      return { success: true, error: false };
    } catch (error) {
      return { success: false, error: true };
    }
};
