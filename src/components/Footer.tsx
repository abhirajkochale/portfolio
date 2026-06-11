export default function Footer() {
  return (
    <footer className="w-full bg-bg-dark border-t py-6" style={{ borderColor: '#2C2825' }}>
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,3.5rem)] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[0.7rem] text-center md:text-left" style={{ color: '#6B6560' }}>
          Designed & Built by Abhiraj Kochale — 2026
        </p>
        <p className="font-mono text-[0.7rem] text-center md:text-right" style={{ color: '#6B6560' }}>
          Made with React + TypeScript
        </p>
      </div>
    </footer>
  );
}
