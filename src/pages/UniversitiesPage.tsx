import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { universitiesAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface University {
  _id: string;
  name: string;
  country: string;
  image?: string;
}

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      const data = await universitiesAPI.getAllPublic();
      setUniversities(data);
    } catch (error) {
      console.error('Failed to load universities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-container py-20">
          <div className="text-center">Loading universities...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h1 className="section-title mb-4">
              Partner Universities
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our trusted partners worldwide offering world-class education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {universities.map((university) => (
              <Card key={university._id} className="group hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={university.image || '/placeholder.svg'}
                    alt={university.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-xl font-bold text-foreground line-clamp-1">
                    {university.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground font-medium">
                      {university.country}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {universities.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No universities found</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default UniversitiesPage;

