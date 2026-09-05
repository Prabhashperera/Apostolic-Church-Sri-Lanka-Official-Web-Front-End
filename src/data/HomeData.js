// ---------------------------------------------------------------------------
// Mock data for the Home page.
// Swap these arrays/objects for real API or CMS data later — every section
// component loops over this data instead of hardcoding content in the JSX.
// ---------------------------------------------------------------------------

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Give', to: '/give', highlight: true },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Resources', to: '/resources' },
  { label: 'Miracle Dome', to: '/miracle-dome' },
  { label: 'Charity', to: '/charity' },
  { label: 'Events', to: '/events' },
  { label: 'Contact Us', to: '/contact' },
];

export const socialLinks = [
  { icon: 'youtube', href: 'https://youtube.com' },
  { icon: 'facebook', href: 'https://facebook.com' },
  { icon: 'instagram', href: 'https://instagram.com' },
  { icon: 'twitter', href: 'https://twitter.com' },
];

export const heroSlides = [
  {
    id: 1,
    eyebrow: 'Vision Possible',
    title: 'Nothing is impossible when God is in it.',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1600',
    ctaLabel: 'Give',
    ctaTo: '/give',
  },
  {
    id: 2,
    eyebrow: 'Vision Possible',
    title: 'Building the Miracle Dome — the birthplace of champions.',
    image: 'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1600',
    ctaLabel: 'Give',
    ctaTo: '/give',
  },
];

export const givingAmounts = [1000, 2000, 5000, 10000, 50000];

export const givingTypes = ['Tithe', 'Offering', 'Building Fund', 'Missions', 'Miracle Dome'];

// Heading is tokenized so specific phrases can be highlighted without
// hardcoding markup into the component.
export const bioHeading = [
  { text: 'Prophet to the ' },
  { text: 'Nations, ', highlight: true },
  { text: 'Bishop of the ' },
  { text: 'The Glorious Apostolic Diocese of Ceylon, ', highlight: true },
  { text: 'Senior Overseer of ' },
  { text: 'The Glorious Church ', highlight: true },
  { text: 'and ' },
  { text: 'The Miracle Dome, ', highlight: true },
  { text: 'Transformational Coach, Philanthropist, Visionary Businessman ' },
  { text: 'and Accomplished author.' },
];

export const bioParagraphs = [
  `Prophet H.E. Ambassador Rt. Rev. Bishop Dr. Jerome Fernando is a prophetic voice and divine oracle to the nations, anointed to unveil the Person of Jesus Christ with clarity and power. Entrusted with a distinctive global mandate, he carries the living Word of God with full expression across continents, cultures, and countless dialects.`,
  `Prophet Jerome Fernando reaches millions worldwide through a dynamic presence on both local and global broadcast platforms, amplifying the now Word of God to households across the globe. Beyond television and radio, his voice and vision have been featured in leading print publications.`,
  `As a distinguished United Nations diplomat, Prophet Jerome has received numerous prestigious accolades for his leadership and global impact. Beyond the pulpit, he is a prolific author and visionary entrepreneur, spearheading successful ventures across diverse sectors.`,
];

export const featureCards = [
  {
    id: 'partnership',
    title: 'Partnership',
    description: 'Become a partner and support the Work of God.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800',
    linkLabel: 'Click Here',
    to: '/partnership',
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Read these limited-edition books written by Prophet Jerome.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800',
    linkLabel: 'Click Here',
    to: '/resources',
  },
  {
    id: 'worship',
    title: 'Worship with Us',
    description: 'Join us and be blessed by attending our services.',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=800',
    linkLabel: 'Click Here',
    to: '/worship',
  },
];

export const credentials = [
  'Doctor of Philosophy (Ph.D.) in Management, Azteca University',
  'Doctor of Divinity (Ph.D.), The American University, USA',
  'Master of Business Administration (MBA), France',
];

export const worshipTagline = 'We Have a Seat for You';
export const prophetPortrait = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200';

// Rotating multi-language headline shown in the service-times section.
export const rotatingTaglines = ['Come Join Us', 'Yisane Enna', 'आयें और देखें', 'வாருங்கள் இணையுங்கள்'];

export const serviceSchedule = [
  { label: 'Thursdays', time: '06:00 PM (IST)' },
  { label: 'Sundays', time: '07:30 AM (IST) — Sinhala & Tamil' },
  { label: 'Sundays', time: '11:30 AM (IST) — English & Sinhala' },
  { label: 'Poya Days', time: '10:00 AM (IST) — Sinhala & Tamil Service' },
];

export const resourceApps = [
  {
    id: 'glorious-tv',
    name: 'Glorious TV',
    description: 'Watch every service and broadcast live, anytime.',
    logo: 'https://placehold.co/160x48/0c1322/ffffff?text=GLORIOUS+TV',
    screenshot: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600',
  },
  {
    id: 'glorious-fm',
    name: 'Glorious FM',
    description: 'Tune in to the Word of God around the clock.',
    logo: 'https://placehold.co/160x48/1d4ed8/ffffff?text=GLORIOUS+FM',
    screenshot: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600',
  },
];

export const lionSection = {
  title: 'Why is Prophet Jerome called the Lion from Asia?',
  cta: 'Watch this to know more',
  thumbnail: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1200',
  videoUrl: 'https://www.youtube.com/watch?v=example',
};

export const pillars = [
  { id: 'church', title: 'Our Church', logo: 'https://placehold.co/96x96/0c1322/ffffff?text=TGC', to: '/church' },
  { id: 'schools', title: 'Schools', logo: 'https://placehold.co/96x96/1d4ed8/ffffff?text=AMP', to: '/schools' },
  { id: 'charity', title: 'Charity', logo: 'https://placehold.co/96x96/2c6cad/ffffff?text=PJFM', to: '/charity' },
  { id: 'miracle-dome', title: 'Miracle Dome', logo: 'https://placehold.co/96x96/123a6b/ffffff?text=MD', to: '/miracle-dome' },
];