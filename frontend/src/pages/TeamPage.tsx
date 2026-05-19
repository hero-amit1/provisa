import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Users } from "lucide-react";
import { teamAPI, resolveImageUrl } from "@/lib/api";
import { motion } from "framer-motion";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamAPI.getAllPublic();
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Team load failed:", err);
        setTeamMembers([]);
        setError("Failed to load team");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading our amazing team...</p>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // ================= EMPTY STATE =================
  if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Users className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Team Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We are building a world-class expert team to guide your journey.
            </p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  // ================= PAGE =================
  return (
    <Layout>
      <section className="py-20 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="section-container">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="uppercase tracking-widest text-primary text-sm mb-2">
              Our Experts
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Professional Team
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dedicated experts helping you achieve your international education goals
              with guidance, clarity, and experience.
            </p>
          </motion.div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all"
              >
                {/* IMAGE */}
                <div className="relative w-28 h-28 mx-auto mb-5">
                  {member.image ? (
                    <img
                      src={resolveImageUrl(member.image)}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-4 border-primary/20 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}

                  {/* glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* INFO */}
                <h3 className="text-lg font-semibold group-hover:text-primary transition">
                  {member.name}
                </h3>

                <p className="text-sm text-primary font-medium mt-1">
                  {member.role}
                </p>

                {member.bio && (
                  <p className="text-xs text-muted-foreground mt-3 line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;