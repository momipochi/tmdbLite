import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [,setPlans] = useState();

  return (
    <div className="p-2 flex-row items-start justify-start">
      <div className="p-2 flex items-start justify-start">
        <div w-full>
          <h1 className="text-left pb-8 w-full">Planning to watch</h1>
          <div>
            <ul className="flex space-x-24">
              <li>dummy</li>
              <li>dummy</li>
              <li>dummy</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <span>Hello world</span>
      </div>
    </div>
  );
}
