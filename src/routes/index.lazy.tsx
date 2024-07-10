import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  // const books = useLiveQuery(() => db.books.toArray());
  return (
    <div className="p-2 flex-row items-start justify-start">
      <div className="p-2 flex items-start justify-start">
        <div>
          <h1 className="text-left pb-8 w-full">Planning to watch</h1>
          <div>
            <ul className="flex space-x-24"></ul>
          </div>
        </div>
      </div>
      <div>
        <span>Hello world</span>
      </div>
    </div>
  );
}
