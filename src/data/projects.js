export const projects = [
  {
    title: 'Shadow of the Seer',
    status: { label: 'In Development', className: 'status-development' },
    description:
      'A 2D top-down pixel adventure action game inspired by Binding of Isaac and enriched with Anatolian middle age elements.',
    details: [
      { label: 'Engine', value: 'Unity6' },
      { label: 'Genre', value: '2D Top-down Pixel Adventure/Action' },
    ],
    cta: 'View Details',
    to: '/projects/current',
  },
  {
    title: 'Completed Games',
    status: { label: 'Released', className: 'status-released' },
    description:
      'A showcase of shipped indie projects that highlight a passion for game development and collaborative production.',
    details: [
      { label: 'Platform', value: 'PC/Mobile/Web' },
      { label: 'Games', value: 'Multiple completed projects' },
    ],
    cta: 'View Games',
    to: '/projects/completed',
  },
  {
    title: 'Future Project',
    status: { label: 'Planned', className: 'status-planned' },
    description:
      'An ambitious, design-driven project currently in pre-production that experiments with advanced mechanics and storytelling.',
    details: [
      { label: 'Target', value: '20??' },
      { label: 'Scope', value: 'In Discovery' },
    ],
    cta: 'Read More',
    to: '/projects/future',
  },
];
