import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import db from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash password
    const passwordHash = await hash(password, 10);

    // Insert new user
    await db.insert(users).values({
      email,
      passwordHash,
      githubId: "", // empty string for non-GitHub users
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
