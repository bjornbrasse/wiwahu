import { Form, Link } from '@remix-run/react';
import { useEffect } from 'react';
import { useSocket } from '~/context';
import { Field } from '~/components/form-elements';

import type { MetaFunction } from '@remix-run/node';
import type { Handle } from '~/types';

type LoaderData = {};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Topico',
  viewport: 'width=device-width,initial-scale=1',
});

export const handle: Handle = {
  id: 'HomePage',
  breadcrumb: {
    caption: 'Thuis',
    to: '/courses',
  },
  thumbMenuItems: ({ data }: { data: LoaderData }) => [
    {
      caption: 'Onderwerpen',
      to: '/topics',
      type: 'link',
    },
  ],
};

export default function Home() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('event', (data) => {
      console.log('KOMT BINNEN:', data);
    });

    socket.emit('event', 'ping');
  }, [socket]);

  return (
    <div
      className="flex h-full flex-col border border-red-700 p-4 md:flex-row"
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}
    >
      <div className="flex flex-1 flex-col">
        <h1>Welcome to Remix + Socket.io</h1>
        <div className="m-4">
          <button type="button" onClick={() => socket?.emit('event', 'ping')}>
            Send ping
          </button>
          <Link
            to="chat"
            className="ml-4 rounded-lg bg-blue-600 p-2 text-white"
          >
            Naar Chat
          </Link>
        </div>
        <p>See Browser console and Server terminal</p>
      </div>
      <div className="flex border-2 border-green-400 md:w-1/2">
        <div className="m-auto flex flex-col rounded-md border-2 border-pink-400 bg-gray-200 p-4">
          <Form method="post">
            <Field label="Quiz code:" name="code" />
            <button className="btn btn-save block" type="submit">
              Start
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
