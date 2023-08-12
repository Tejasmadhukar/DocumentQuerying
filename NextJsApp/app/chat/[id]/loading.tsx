import { GoodSpinner } from "@/components/NextuiClient";
export default function ChatpageLoading() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center mb-40 ">
      <div className="max-w-lg  justify-center gap-4 ">
        <GoodSpinner />
      </div>
    </section>
  );
}