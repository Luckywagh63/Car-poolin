'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Check session status

  const handleFindCabClick = () => {
    if (session) {
      // If the user is signed in, navigate to the Find A Cab page
      router.push('/find-cab');
    } else {
      // If the user is not signed in, navigate to the Sign In page
      router.push('/api/auth/signin');
    }
  };

  return (
    <main
      className="p-4 md:p-40 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/009/901/072/small_2x/blue-sky-purple-black-bubble-colorful-gradient-rainbow-pastel-brush-paint-smoke-creative-graphic-design-abstract-vintage-pattern-brush-template-beautiful-black-background-wallpaper-copy-space-vector.jpg')`,
      }}
    >
      <h1 className="text-5xl md:text-5xl font-bold text-center mb-6 md:mb-12 text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
        Apex CarPooling
      </h1>

      {/* Find a Cab Button */}
      <div className="mb-10 text-center">
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-3xl py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleFindCabClick}
        >
          Find A Cab
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
        {/* Card 1 */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/837/470/390/car-vehicle-bmw-dark-digital-art-hd-wallpaper-preview.jpg"
            alt="Carpooling 1"
            className="w-full h-auto object-cover rounded-md mb-4"
          />
          <p className="text-gray-700">
            Join our carpooling community and save on travel costs while reducing your carbon footprint.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <img
            src="https://imageio.forbes.com/specials-images/dam/imageserve/1161159565/960x0.jpg?height=474&width=711&fit=bounds"
            alt="Carpooling 2"
            className="w-full h-auto object-cover rounded-md mb-4"
          />
          <p className="text-gray-700">
            Connect with drivers heading your way and make your commute more enjoyable.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <img
            src="https://img.freepik.com/free-vector/carpool-concept-illustration_114360-9268.jpg"
            alt="Carpooling 3"
            className="w-full h-auto object-cover rounded-md mb-4"
          />
          <p className="text-gray-700">
            Reduce traffic congestion and help the environment by sharing rides.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
