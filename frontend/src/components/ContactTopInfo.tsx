import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { settingsAPI } from '@/lib/api';

type Settings = {
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
};

const ContactTopInfo = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    settingsAPI
      .getPublic()
      .then((data) => setSettings(data as Settings))
      .catch(() => setSettings(null));
  }, []);

  const address =
    settings?.address?.trim() ||
    'Laxmi Plaza, Putalisadak, Padmodaya Mode, Kathmandu, Nepal';

  const phone = settings?.phone?.trim() || '+9779851101782 , 01-4531819';
  const email = settings?.email?.trim() || 'admin@provisa.com.np';

  const cleanPhone = (p: string) => p.replace(/[^\d+]/g, '');

  const items = [
    {
      icon: MapPin,
      label: 'Kathmandu Office',
      value: address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`,
      type: 'text',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: phone,
      href: `tel:${cleanPhone(phone)}`,
      type: 'phone',
    },
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      type: 'email',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 w-full min-w-0">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-3 w-full min-w-0"
        >
          {/* ICON */}
          <a
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={item.label}
            className="shrink-0"
          >
            <item.icon className="h-5 w-5 text-primary" />
          </a>

          {/* TEXT */}
          <div className="min-w-0 w-full leading-relaxed">
            <h3 className="font-heading font-semibold text-foreground break-words">
              {item.label}
            </h3>

            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="
                text-sm text-muted-foreground 
                hover:text-primary 
                underline-offset-4 hover:underline 
                block w-full
                break-words
                sm:break-words
                md:break-all
              "
            >
              {item.value}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactTopInfo;