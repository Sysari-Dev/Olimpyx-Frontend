import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-black text-white py-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold"></div>
              <span className="text-xl font-bold tracking-tight">OLIMPYX</span>
            </div>
            <p className="text-light/60 text-sm leading-relaxed max-w-xs">
              Potencie sus eventos deportivos institucionales. Con OLIMPYX, las
              municipalidades y organizaciones pueden conectar a los ciudadanos
              con la pasión del deporte, ofreciendo una ventana digital en
              tiempo real para cada torneo y competencia.
            </p>
            <div className="flex gap-4">
              <SocialIcon
                icon={<Twitter size={18} />}
                href="https://x.com/SysariCorp"
              />
              <SocialIcon
                icon={<Linkedin size={18} />}
                href="https://www.linkedin.com/company/sysari/"
              />
              <SocialIcon
                icon={<Facebook size={18} />}
                href="https://www.facebook.com/SysariCode/"
              />
              <SocialIcon
                icon={<Instagram size={18} />}
                href="https://www.instagram.com/sysari__/"
              />
            </div>
          </div>
          <FooterColumn title="Productos">
            <FooterLink label="Apugo" href="https://www.sysari.net" />
            <FooterLink label="Mark SoS" href="https://www.sysari.net" />
            <FooterLink label="Chess Clock" href="https://www.sysari.net" />
          </FooterColumn>
          <FooterColumn title="Sysari">
            <FooterLink
              label="Sobre Nosotros"
              href="https://www.sysari.net/misión-y-visión"
            />
            <FooterLink
              label="Blog de Noticias"
              href="https://www.sysari.net"
            />
            <FooterLink label="Contacto" href="https://www.sysari.net" />
          </FooterColumn>

          <FooterColumn title="Recursos">
            <FooterLink label="Comunidad" href="https://www.sysari.net" />
            <FooterLink
              label="Estado del Sistema"
              href="https://www.sysari.net"
            />
          </FooterColumn>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-light/40">
          <div className="flex items-center gap-4">
            <span>© {currentYear} OLIMPYX. Todos los derechos reservados.</span>
          </div>
          <div className="flex gap-1">
            Un producto desarrollado por{" "}
            <a href="https://www.sysari.net" className="hover:text-tertiary">
              @Sysari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-white font-bold text-sm uppercase tracking-widest">
      {title}
    </h3>
    <ul className="flex flex-col gap-3">{children}</ul>
  </div>
);

const FooterLink = ({
  label,
  href = "#",
}: {
  label: string;
  href?: string;
}) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-light/60 hover:text-white text-sm transition-colors duration-200 block w-fit"
    >
      {label}
    </a>
  </li>
);

const SocialIcon = ({
  icon,
  href,
}: {
  icon: React.ReactNode;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="w-9 h-9 cursor-pointer rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-light/60"
  >
    {icon}
  </a>
);
export default Footer;
