import { title } from "@/components/primitives";

export default function NotAllowedChat () {
    return (
        <section className="flex items-center justify-items-center justify-center mt-20">
          <div className="max-w-lg text-center justify-center gap-4 mt-36">
            <h1 className={title({ color: "violet" })}>Login&nbsp;</h1>
            <h1 className={title()}>
              to use this page
            </h1>
          </div>
        </section>
      );
}