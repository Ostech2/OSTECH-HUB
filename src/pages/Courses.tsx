import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/course/CourseCard';
import { courses, categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.trainerName.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((course) =>
        course.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Level filter
    if (selectedLevel !== 'all') {
      result = result.filter((course) => course.level === selectedLevel);
    }

    // Sorting
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary via-background to-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Explore Our Courses
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Discover courses designed to help Ugandan SMEs grow and succeed in the digital economy.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses, topics, or trainers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-xl border-border bg-card shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Filters:</span>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
          </p>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No courses found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
