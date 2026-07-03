import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative h-dvh overflow-hidden">
      <section
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,#6FBEB2_0,#6FBEB2_1px,#0B0909_0,#0B0909_10px)]"
        aria-hidden
      />

      <div className="relative h-full overflow-y-auto">
        <div className="mx-auto w-full max-w-xl sm:max-w-2xl md:max-w-6xl min-h-dvh bg-[#0B0909] border-x border-[#6FBEB2] text-[#A5E9DD] p-4 sm:p-6 md:p-8 flex flex-col gap-6">
          <header className="flex flex-col gap-1.5 border-b border-[#6FBEB2]/40 pb-6">
            <Link
              to="/"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl hover:text-white transition-colors w-fit"
            >
              Typescript Lessons
            </Link>
            <section className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-[#A5E9DD]/80">
              <p>By Hisukurifu</p>
              <p className="hover:text-white transition-colors">
                &#91;
                <a
                  href="https://akane-typescript-lesson.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  Originally by Akane
                </a>
                &#93;
              </p>
            </section>
          </header>

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
