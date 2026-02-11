'use client';

import dynamic from 'next/dynamic';

const ToastContainerLazy = dynamic(
  () => import('@/components/toast-container-lazy'),
  { ssr: false }
);

const Modal = dynamic(() => import('@/components/modal'), { ssr: false });

export default function LazyLayoutClient() {
  return (
    <>
      <Modal />
      <ToastContainerLazy />
    </>
  );
}
