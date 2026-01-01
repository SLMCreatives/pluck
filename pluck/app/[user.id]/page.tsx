"use client";

import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProfilePage({ params }: any) {
  const { user } = params;
  return <div>Profile Page {user}</div>;
}
