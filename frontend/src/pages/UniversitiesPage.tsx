import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { universitiesAPI } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, MapPin } from 'lucide-react';

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
      const res = await universitiesAPI.getAllPublic();

      const normalized =
        Array.isArray(res)
          ? res
          : Array.isArray((res as { data?: unknown } | undefined)?.data)
          ? (res as { data?: unknown }).data
          : [];

      setUniversities(Array.isArray(normalized) ? normalized : []);
    } catch (error) {
      console.error('Failed to load universities:', error);
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding bg-gradient-to-b from-muted/30 via-background to-background">
        <div className="section-container">

          {/* HEADER */}
          <div className="text-center mb-14">
            <h1 className="section-title mb-4">
              Partner Universities
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore our global network of trusted universities offering world-class education opportunities.
            </p>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-muted animate-pulse"
                />
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && universities.length === 0 && (
            <div className="text-center py-24">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Universities Found</h3>
              <p className="text-muted-foreground">
                We are currently updating our partner network.
              </p>
            </div>
          )}

          {/* GRID */}
          {!loading && universities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

              {universities.map((university, index) => (
                <Card
                  key={university._id}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >

                  {/* IMAGE */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={university.image || '/placeholder.svg'}
                      alt={university.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition" />

                    {/* COUNTRY BADGE */}
                    <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {university.country}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <CardContent className="p-5">

                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {university.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      Official partner university offering international programs and student exchange opportunities.
                    </p>

                    <div className="mt-4 flex items-center justify-between">

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        Global Partner
                      </div>

                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        Verified
                      </span>

                    </div>

                  </CardContent>
                </Card>
              ))}

            </div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default UniversitiesPage;