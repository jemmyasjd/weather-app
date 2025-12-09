export default function Footer() {
  return (
    <footer className="mt-auto border-t py-6">
      <div className="mx-0 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} InRisk Labs. Climate Risk Platform Demo.
        </p>
        <p className="text-sm text-muted-foreground">
          Data sourced from Open-Meteo Historical Weather API
        </p>
      </div>
    </footer>
  );
}