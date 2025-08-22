// import { MemoCounter } from "./06-memos/MemoCounter";
// import { InstagramApp } from "./07-useOptimistic/InstagramApp";
import { Suspense } from "react";
import { getUserAction } from "./08-use-suspense/api/get-user.action";
import { ClientInformation } from "./08-use-suspense/ClientInformation";

const id = crypto.randomUUID();

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="bg-gradient flex flex-col">
            <h1 className="text-2xl">Cargando</h1>
          </div>
        }
      >
        <ClientInformation getUser={getUserAction(id)} />
      </Suspense>
    </div>
  );
}

export default App;
