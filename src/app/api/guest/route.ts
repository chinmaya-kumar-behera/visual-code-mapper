import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    // Create a guest user with a unique ID
    const guestId = uuidv4();

    // Return guest user info (no DB persistence for guest)
    return NextResponse.json({
      id: guestId,
      email: null,
      name: "Guest User",
      isGuest: true,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
