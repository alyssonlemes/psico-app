import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the auth page by default
  redirect('/auth');

  // Or keep a simple placeholder if redirection isn't desired immediately
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center p-24">
  //     <h1>Homepage - Redirecting to Auth...</h1>
  //   </main>
  // );
}

