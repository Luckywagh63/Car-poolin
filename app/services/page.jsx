// app/services/page.jsx
'use client';

const ServicesPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-300 p-6">
      <h1 className="text-5xl font-bold mb-8 text-purple-800">Our Services</h1>
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <p className="mb-6 text-lg text-gray-700 text-center">
          We offer a variety of carpooling services to make your travel convenient:
        </p>
        <ul className="list-disc list-inside space-y-4">
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span className="text-gray-800">Shared Rides: Travel with others heading in the same direction.</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span className="text-gray-800">Premium Rides: Enjoy a comfortable ride in a luxury vehicle.</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span className="text-gray-800">Booking Management: Easy to book, modify, or cancel rides through our app.</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-blue-500">✔️</span>
            <span className="text-gray-800">Real-time Tracking: Stay updated on your driver’s location.</span>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default ServicesPage;
