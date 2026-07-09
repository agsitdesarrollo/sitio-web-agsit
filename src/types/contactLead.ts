export type ContactLeadInput = {
  name: string;
  lastName?: string;
  phone?: string;
  email?: string;
  company?: string;
  message?: string;
  pageUrl?: string;
  pageTitle?: string;
  website?: string;
  utm?: Partial<Record<'source' | 'medium' | 'campaign' | 'content' | 'term', string>>;
};

export type BitrixLeadResult = {
  leadId: number;
};
