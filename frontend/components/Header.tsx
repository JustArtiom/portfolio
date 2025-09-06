import Logo from "@/assets/svg/logo.svg";

export default function Header() {
  return (
    <div className="fixed w-full flex justify-between items-center backdrop-blur-md z-30">
      <header className="w-full px-6 mx-auto flex justify-between items-center max-w-[1200px] py-6">
        <Logo className="h-8 w-8" />
        <nav>
          <ul className="flex space-x-4">
            {[`about`, `roadmap`, `projects`, `contact`].map((item) => (
              <li key={item} className="hover:animate-wiggle">
                <a
                  href={`#${item}`}
                  className="p-2 text-sm uppercase tracking-wider hover:text-accent transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}
