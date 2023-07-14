import { Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { Shortened } from './types';
import { Image } from '@chakra-ui/react';

type UrlListProps = {
  urls: Array<Shortened>;
};

export const UrlList: React.FC<UrlListProps> = ({ urls }) => {
  return (
    <UnorderedList id="urlList" textAlign="left">
      {urls.map((u) => (
        <ListItem>
          <Link href={u.short} color="teal.500">
            {u.short}
          </Link>{' '}
          - {u.original}
          <Image
            src={u.qrCode}
            alt={`QR Code for ${u.original}`}
          />
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default UrlList;