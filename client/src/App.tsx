import './styles/index.css';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useState } from 'react';

import Navbar from './components/Navbar';

// ✅ Dynamic URI: uses .env in prod, /graphql in dev (via proxy)
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          savedPets: {
            merge(_existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Navbar showModal={showModal} setShowModal={setShowModal} />
      <Outlet context={{ showModal, setShowModal }} />
    </ApolloProvider>
  );
}

export default App;
