import React from "react";

function page() {
  return (
    <main className="flex flex-col justify-center gap-4 pt-4">
      <div className="p-5">Upcoming Features</div>
      <div className="flex flex-col justify-center gap-4 px-5 pt-4 lg:flex-row lg:w-[750px]">
        <div className="flex flex-col gap-4">
          <div>
            <h1>Todo&apos;s</h1>
            <ul className="h-[450px] rounded-md border p-4">
              <li className="rounded-md border p-4">Save/</li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1>In Progress</h1>
            <ul className="h-[450px] rounded-md border p-4">
              <li className="rounded-md border p-4">Coherent UI fix</li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1>Done</h1>
            <ul className="h-[450px] rounded-md border p-4">
              <li className="rounded-md border p-4">Overview of saved books</li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
