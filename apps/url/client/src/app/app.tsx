import { useCallback, useState } from 'react';
import axios from 'axios';
import { Shortened } from '../types';

import {
  Button,
  Container,
  Text,
  Input,
  UnorderedList,
  ListItem,
  Link,
  Image,
} from '@chakra-ui/react';
import ShortenUrlForm from '../ShortenUrlForm';
import UrlList from '../UrlList';



export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);
  const requestShortUrl = useCallback(
    async (inputUrl: string) => {
      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });

      const newUrl = response.data as Shortened;

      setUrls([newUrl, ...urls]);
    },
    [urls, setUrls]
  );

  return (
    <Container maxWidth="4xl" marginBlock={10} textAlign="center">
      <Text fontSize="4xl">My URL Shortener</Text>
      <ShortenUrlForm requestShortUrl= {requestShortUrl} />
      <UrlList urls={urls} />
    </Container>
  );
}

export default App;