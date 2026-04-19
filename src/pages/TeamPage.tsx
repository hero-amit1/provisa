import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import { Users } from "lucide-react";
import { teamAPI } from '@/lib/api';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamAPI.getAllPublic();
        setTeamMembers(data);
      } catch (err) {
        setError('Failed to load team');
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading team...</div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">Our Team</p>
            <h1 className="section-title mb-4">Meet Our Experts</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced team is dedicated to helping you achieve your study abroad dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member._id} className="bg-card border border-border rounded-xl p-6 text-center card-hover">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
