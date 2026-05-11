import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { settingsAPI } from '@/lib/api';

type Settings = {
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
};

// Defaults here are only used while settings are loading or if backend returns empty data.

const ContactTopInfo = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    settingsAPI
      .getPublic()
      .then((data) => setSettings(data as Settings))
      .catch(() => setSettings(null));
  }, []);

  const address = settings?.address || 'Laxmi Plaza, Putalisadak, Padmodaya Mode, Kathmandu, Nepal';
  const phone = settings?.phone || '+9779851101782';
  const email = settings?.email || 'admin@provisa.com.np';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {[
        {
          icon: MapPin,
          label: 'Kathmandu Office',
          value: address,
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
        },
        {
          icon: Phone,
          label: 'Phone',
          value: phone,
          href: `tel:${phone.replace(/\s+/g, '')}`,
        },
        {
          icon: Mail,
          label: 'Email',
          value: email,
          href: `mailto:${email}`,
        },
      ].map((item) => (
        <div key={item.label} className="flex items-start gap-3">
          <a
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            className="group"
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5 text-primary mt-1 shrink-0 group-hover:scale-110 transition-transform" />
          </a>

          <div>
            <h3 className="font-heading font-semibold text-foreground">{item.label}</h3>
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
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

