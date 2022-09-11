import { useEffect, useState } from 'react';
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from '@remix-run/react';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { SocketProvider } from './context';

import { MessageProvider } from './context/messages';
import { DrawerMenu } from './components/menus/drawer-menu';
import { ThumbMenu } from './components/menus/thumb-menu';
import { getSessionUserSecure, logout } from './session.server';
import { badRequest } from './utils/badRequest';

import type { UserSecure } from './models/user.server';

import tailwindStylesheetUrl from './tailwind.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStylesheetUrl, as: 'css' },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
      integrity:
        'sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==',
      crossOrigin: 'anonymous',
      referrerPolicy: 'no-referrer',
    },
  ];
};

type LoaderData = {
  user: UserSecure;
};

export const loader: LoaderFunction = async ({ request }) => {
  return { user: await getSessionUserSecure(request) };
};

export const action: ActionFunction = async ({ request }) => {
  const { _action } = Object.fromEntries(await request.formData());

  if (typeof _action !== 'string') return badRequest({ error: 'geen _action' });

  if (_action === 'logout') {
    return await logout(request);
  }
};

export default function Root() {
  const { user } = useLoaderData() as LoaderData;

  const [socket, setSocket] = useState<Socket>();
  const [showMenu, setShowMenu] = useState(false);

  const deepestMatch = useMatches()[useMatches().length - 1];
  const thumbMenuItems = deepestMatch?.handle?.thumbMenuItems
    ? deepestMatch.handle.thumbMenuItems(deepestMatch)
    : null;

  useEffect(() => {
    const socket = io();
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('confirmation', (data) => {
      console.log(data);
    });

    socket.on('sendMessage', (data) => {
      console.log(`Dit bericht is verzonden:`, data);
    });
  }, [socket]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <SocketProvider socket={socket}>
        <DndProvider backend={HTML5Backend}>
          <MessageProvider>
            <body className="flex h-screen flex-col">
              <div className="flex h-12 items-center bg-primary p-2 text-primary-text ">
                <button
                  className="mr-2 h-8 w-8 rounded-full bg-gray-400"
                  onClick={() => setShowMenu((value) => !value)}
                >
                  M
                </button>
                <p className="text-2xl font-bold">Topico</p>
                {user ? (
                  <div className="ml-auto flex gap-3">
                    {user.isAdmin && <Link to="/admin">A</Link>}
                    <Form method="post">
                      <button type="submit" name="_action" value="logout">
                        {user.firstName}
                      </button>
                    </Form>
                  </div>
                ) : (
                  <Link
                    className="ml-auto rounded-lg bg-gray-300 p-1 text-primary-text"
                    to="/auth/login"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="relative h-full overflow-hidden">
                <Outlet />
                {showMenu && <DrawerMenu setShowMenu={setShowMenu} />}
              </div>
              <ThumbMenu menuItems={thumbMenuItems} />
            </body>
          </MessageProvider>
        </DndProvider>
      </SocketProvider>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </html>
  );
}
