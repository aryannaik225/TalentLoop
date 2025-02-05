import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();
    const { uid, name, email, role, company, skills } = await req.json();

    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const newUser = new User({
      uid,
      name,
      email,
      role,
      company: role === "recruiter" ? company : undefined,
      skills: role === "job-seeker" ? skills : [],
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
