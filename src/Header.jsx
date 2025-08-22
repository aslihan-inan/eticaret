import React from "react";
import Ndark from "./Ndark";
import Nlight from "./Nlight";

export default function Header() {
  return (
    <header className="bg-gray-100 p-4">
     <div className="justify-between items-center max-w-auto mx-auto">
  <Ndark />
  <Nlight />
</div>
    </header>
  );
}
