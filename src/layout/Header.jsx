import React from "react";
import { useSelector } from "react-redux";
import Gravatar from "react-gravatar";

export default function Header() {
  // client slice'ta user yoksa hata vermemesi için default {}
  const user = useSelector(state => state.client?.user || {});

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1>Commerce App</h1>
      {user.email ? (
        <div className="flex items-center gap-2">
          <Gravatar email={user.email} size={40} default="retro" />
          <span>{user.name || user.email}</span>
        </div>
      ) : (
        <span>Not logged in</span>
      )}
    </header>
  );
}
