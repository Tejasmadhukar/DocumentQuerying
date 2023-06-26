import { title } from "@/components/primitives";

export default function NotAllowedChat () {
    return (
        <section className="flex flex-col items-center justify-center h-screen py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center mt-[-400px]">

            <h1 className={title({ color: "violet" })}>Login&nbsp;</h1>
            <h1 className={title()}>
              to use this page
            </h1>
          </div>
        </section>
      );
}