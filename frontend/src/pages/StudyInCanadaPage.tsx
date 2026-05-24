import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import canadaImg from "@/assets/canada.jpg";
import { MapPin, GraduationCap, Users, DollarSign, BookOpen, Users2, } from "lucide-react";


const StudyInCanadaPage = () => {
    return (
        <Layout>
            <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src={canadaImg}
                    alt="Study in Canada"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
                    <div className="section-container">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">
                            Study in Canada 🇨🇦
                        </h1>
                        <p className="text-xl md:text-2xl max-w-2xl opacity-95 leading-relaxed">
                            Welcoming immigration, high quality of life, excellent post-grad work
                        </p>
                    </div>
                </div>
            </section>

            <div className="section-container py-20">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">100+</div>
                        <div className="text-muted-foreground text-lg">Universities</div>
                    </div>
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">800K+</div>
                        <div className="text-muted-foreground text-lg">International Students</div>
                    </div>
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">CAD25K</div>
                        <div className="text-muted-foreground text-lg">Avg Tuition/Year</div>
                    </div>
                </div>

                <div className="text-center mb-24">
                    <Link to="/appointment" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground px-10 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                        Start Your Canada Journey
                        <MapPin className="h-6 w-6" />
                    </Link>
                </div>

                <section className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                        Why Study in Canada?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Top Universities</h3>
                            <p className="text-muted-foreground">World-renowned institutions with global recognition.</p>
                        </div>
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <Users2 className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">PR Pathways</h3>
                            <p className="text-muted-foreground">Excellent immigration opportunities after graduation.</p>
                        </div>
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <DollarSign className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Affordable Living</h3>
                            <p className="text-muted-foreground">High quality of life at reasonable costs.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Education System</h2>
                    <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-center mb-12 leading-relaxed">
                        Canada offers two major intakes with excellent post-graduation work opportunities.
                    </p>
                </section>

                <section className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Requirements</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Undergraduate</h3>
                            <ul className="space-y-3 text-lg">
                                <li>IELTS 6.5 overall</li>
                                <li>Grade 12 GPA 70%+</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Postgraduate</h3>
                            <ul className="space-y-3 text-lg">
                                <li>IELTS 6.5-7.0</li>
                                <li>4-year bachelor's degree</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="text-center mb-24">
                    <Link to="/appointment" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground px-10 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                        Start Your Canada Journey
                        <MapPin className="h-6 w-6" />
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default StudyInCanadaPage;

