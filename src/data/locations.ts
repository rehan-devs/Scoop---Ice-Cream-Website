export interface Location {
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  image: string;
  mapUrl: string;
}

export const locations: Location[] = [
  {
    name: 'SCOÖP Downtown',
    address: '142 Main Street',
    city: 'Portland, OR 97204',
    phone: '(503) 555-0142',
    hours: {
      weekday: 'Mon–Thu: 12pm – 10pm',
      weekend: 'Fri–Sun: 11am – 11pm',
    },
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    mapUrl: 'https://maps.google.com',
  },
  {
    name: 'SCOÖP Pearl District',
    address: '528 NW 12th Avenue',
    city: 'Portland, OR 97209',
    phone: '(503) 555-0528',
    hours: {
      weekday: 'Mon–Thu: 11am – 10pm',
      weekend: 'Fri–Sun: 11am – 11pm',
    },
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
    mapUrl: 'https://maps.google.com',
  },
  {
    name: 'SCOÖP Hawthorne',
    address: '3847 SE Hawthorne Blvd',
    city: 'Portland, OR 97214',
    phone: '(503) 555-3847',
    hours: {
      weekday: 'Mon–Thu: 12pm – 9pm',
      weekend: 'Fri–Sun: 11am – 10pm',
    },
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    mapUrl: 'https://maps.google.com',
  },
];