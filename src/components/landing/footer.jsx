import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="container mx-auto w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} POSSystem. Todos los derechos reservados.
          </p>
          <nav className="flex gap-4 md:gap-2 md:ml-4">
            <a
              href="#"
              className="text-sm font-medium underline underline-offset-4 hover:text-primary"
            >
              Términos
            </a>
            <a
              href="#"
              className="text-sm font-medium underline underline-offset-4 hover:text-primary"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="text-sm font-medium underline underline-offset-4 hover:text-primary"
            >
              Contacto
            </a>
          </nav>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
