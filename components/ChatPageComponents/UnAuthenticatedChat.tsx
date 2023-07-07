import { title } from "@/components/primitives";

export default function NotAllowedChat () {
    return (
        <>
          <div className=" align-middle" style={{ alignItems: 'center', justifyContent: 'center'}}>
            <h1 className={title({ color: "violet" })}>Login&nbsp;</h1>
            <h1 className={title()}>
              to use this page
            </h1>
          </div>
        </>
      );
}