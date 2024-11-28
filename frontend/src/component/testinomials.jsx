import TestimonialCard from "./TestinomialCard";


const testimonials = [
  {
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
    name: "Leslie Alexander",
    role: "Freelance React Developer",
    rating: 5,
    content: "You made it so simple. My new site is so much faster and easier to work with than my old site.",
  },
  {
    avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
    name: "Jacob Jones",
    role: "Digital Marketer",
    rating: 5,
    content: "Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.",
  },
  // Add more testimonials here...
];

const Testimonial = () => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">Ratings and Reviews</p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">Our Happy Users Say About Us</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        {/* <div className="mt-8 text-center">
          <a href="#" className="text-base font-bold text-gray-900 border-b-2 border-gray-900 hover:border-gray-600">
            Check all 2,157 reviews
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonial;
