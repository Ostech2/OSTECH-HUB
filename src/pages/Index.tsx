import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Categories />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
