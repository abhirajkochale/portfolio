export default function Footer() {
  return (
    <footer className="w-full bg-bg border-t border-border py-6">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[0.7rem] text-muted text-center md:text-left">
          Designed & Built by Abhiraj Kochale — 2025
        </p>
        <p className="font-mono text-[0.7rem] text-muted text-center md:text-right">
          Made with React + TypeScript
        </p>
      </div>
    </footer>
  );
}
