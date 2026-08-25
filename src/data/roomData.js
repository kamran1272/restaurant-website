import { withBasePath } from '../utils/sitePaths';

export const roomTypes = [
  {
    slug: 'single-room',
    number: '01',
    title: 'Single Room',
    guests: 1,
    bed: 'Single bed',
    image: withBasePath('/img/r2.jpg'),
    description: 'A focused stay for solo travellers, students, and professionals visiting Bhakkar.',
  },
  {
    slug: 'double-room',
    number: '02',
    title: 'Double Room',
    guests: 2,
    bed: 'Double bed',
    image: withBasePath('/img/r3.jpg'),
    description: 'A comfortable option for couples, friends, and business travellers.',
  },
  {
    slug: 'triple-room',
    number: '03',
    title: 'Triple Room',
    guests: 3,
    bed: 'Three sleeping places',
    image: withBasePath('/img/r4.jpg'),
    description: 'Flexible accommodation for small groups travelling together.',
  },
  {
    slug: 'family-room',
    number: '04',
    title: 'Family Room',
    guests: 4,
    bed: 'Family sleeping arrangement',
    image: withBasePath('/img/r5.jpg'),
    description: 'More space for families and guests planning a shared stay.',
  },
  {
    slug: 'large-family-room',
    number: '05',
    title: 'Large Family Room',
    guests: 5,
    bed: 'Large family sleeping arrangement',
    image: withBasePath('/img/r6.jpg'),
    description: 'A larger option for families and groups who need room to settle in.',
  },
];

export function getRoomType(slug) {
  return roomTypes.find((room) => room.slug === slug);
}
