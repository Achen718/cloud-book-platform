'use client';
import { NavbarDefault } from '@/components/layout/nav/NavBar';
import { SimpleFooter } from '@/components/layout/footer/Footer';

export default function Home() {
  return (
    <section className='w-full'>
      <NavbarDefault />
      <section>Home</section>
      <SimpleFooter />
    </section>
  );
}
