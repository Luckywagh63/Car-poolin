import Head from 'next/head';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about our company and team." />
      </Head>
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-black">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Our mission is to provide the best services to our customers and ensure their satisfaction.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-black">Our Team</h2>
          <p className="text-gray-700 mb-4">
            We have a diverse team of professionals who are experts in their respective fields.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-black">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions, feel free to reach out to us at contact@ourcompany.com.
          </p>
        </section>
      </main>
    </div>
  );
}
