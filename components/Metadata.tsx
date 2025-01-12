import { Metadata } from 'next';

type MetadataProps = {
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: 'Default Title',
  description: 'Default Description',
};

const MetadataComponent = ({ title, description }: MetadataProps) => {
  metadata.title = title;
  metadata.description = description;
  return null;
};

export default MetadataComponent;