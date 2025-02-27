// Définir l'interface Launch
export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    success: boolean;
    details: string | null;
    links: {
      patch: {
        large: string | null;
      };
      youtube_id: string | null;
    };
    launchpad: {
      name: string;
    };
    payloads: {
      id: string;
      name: string;
      type: string;
      customers: string[];
    }[];
  }
  
  // "Utiliser" l'interface Launch pour éviter l'avertissement
  const dummyLaunch: Launch = {
    id: 'dummy',
    name: 'Dummy Launch',
    date_utc: '2023-01-01T00:00:00.000Z',
    success: true,
    details: null,
    links: {
      patch: {
        large: null,
      },
      youtube_id: null,
    },
    launchpad: {
      name: 'Dummy Launchpad',
    },
    payloads: [],
  };
  
  // Vous pouvez supprimer cette variable si vous n'en avez pas besoin
  console.log(dummyLaunch);