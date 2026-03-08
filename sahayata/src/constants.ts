export interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  documents: string[];
  applyLink: string;
  category: 'Financial' | 'Insurance' | 'Equipment' | 'Irrigation' | 'Marketing';
  criteria?: {
    maxFarmSize?: number;
    minFarmSize?: number;
    minAge?: number;
    maxAge?: number;
    maxAnnualIncome?: number;
    allowedStates?: string[];
    allowedCategories?: string[];
    allowedGenders?: string[];
  };
}

export const ALL_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    description: 'A central sector scheme that provides an income support of ₹6,000 per year in three equal installments to all landholding farmer families.',
    eligibility: 'All landholding farmer families are eligible. Exclusions apply for high-income individuals, professionals, and institutional landholders.',
    documents: ['Aadhaar Card', 'Land Holding Documents', 'Bank Account Details'],
    applyLink: 'https://pmkisan.gov.in/',
    category: 'Financial',
    criteria: {
      minFarmSize: 0.1,
      maxAnnualIncome: 200000,
      minAge: 18
    }
  },
  {
    id: 'pmfby',
    name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    description: 'A government-sponsored crop insurance scheme that integrates multiple stakeholders to provide comprehensive risk coverage for crops.',
    eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas are eligible.',
    documents: ['Aadhaar Card', 'Land Records/Tenancy Agreement', 'Sowing Certificate', 'Bank Passbook'],
    applyLink: 'https://pmfby.gov.in/',
    category: 'Insurance',
    criteria: {
      minAge: 18
    }
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC)',
    description: 'Provides farmers with timely access to credit for their cultivation and other needs like purchase of agriculture inputs and for their non-farm activities.',
    eligibility: 'All farmers - individuals/joint borrowers, tenant farmers, oral lessees and sharecroppers, etc.',
    documents: ['Aadhaar Card', 'PAN Card', 'Land Documents', 'Passport Size Photograph'],
    applyLink: 'https://www.pnbindia.in/kisan-credit-card.html',
    category: 'Financial',
    criteria: {
      minAge: 18
    }
  },
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM',
    description: 'Aims to provide energy security to farmers and de-dieselize the farm sector by installing solar pumps and grid-connected solar power plants.',
    eligibility: 'Individual farmers, groups of farmers, cooperatives, panchayats, Farmer Producer Organisations (FPOs).',
    documents: ['Aadhaar Card', 'Land Documents', 'Bank Account Details', 'Mobile Number'],
    applyLink: 'https://pmkusum.mnre.gov.in/',
    category: 'Irrigation',
    criteria: {
      minFarmSize: 0.5,
      minAge: 18
    }
  },
  {
    id: 'e-nam',
    name: 'e-NAM (National Agriculture Market)',
    description: 'A pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.',
    eligibility: 'Farmers, Traders, and Mandis across India.',
    documents: ['Aadhaar Card', 'Bank Account Details', 'Mobile Number'],
    applyLink: 'https://enam.gov.in/',
    category: 'Marketing',
    criteria: {
      minAge: 18
    }
  },
  {
    id: 'smam',
    name: 'SMAM (Sub-Mission on Agricultural Mechanization)',
    description: 'Aims to increase the reach of farm mechanization to small and marginal farmers and to the regions where availability of farm power is low.',
    eligibility: 'Small and marginal farmers, women farmers, and farmers belonging to SC/ST categories are given preference.',
    documents: ['Aadhaar Card', 'Voter ID', 'Bank Passbook', 'Land Holding Documents', 'Caste Certificate (if applicable)'],
    applyLink: 'https://farmech.dac.gov.in/',
    category: 'Equipment',
    criteria: {
      maxFarmSize: 5,
      minAge: 18
    }
  }
];
