import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import { Users } from "lucide-react";
import { teamAPI, resolveImageUrl } from '@/lib/api';


const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamAPI.getAllPublic();
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Team load failed:', err);
        setTeamMembers([]);
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

  if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
    return (
      <Layout>
        <section className="section-padding text-center">
          <div className="section-container">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Team Members</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our expert team is growing. Stay tuned!
            </p>
          </div>
        </section>
      </Layout>
    );
  }


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
                {member.image ? (
                  <img src={resolveImageUrl(member.image)} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg" loading="lazy" />
                ) : (
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
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
