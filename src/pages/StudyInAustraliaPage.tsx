import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import australiaImg from "@/assets/australia.jpg";
import { MapPin, GraduationCap, Users, DollarSign, BookOpen, Users2, Briefcase, Globe, Award, Shield, Calendar, FileText, CheckCircle } from "lucide-react";

const StudyInAustraliaPage = () => {
    return (
        <Layout>
            <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src={australiaImg}
                    alt="Study in Australia"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
                    <div className="section-container">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">
                            Study in Australia 🇦🇺
                        </h1>
                        <p className="text-xl md:text-2xl max-w-2xl opacity-95 leading-relaxed">
                            World-class education with vibrant lifestyle and excellent opportunities
                        </p>
                    </div>
                </div>
            </section>

            <div className="section-container py-20">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">40+</div>
                        <div className="text-muted-foreground text-lg">Universities</div>
                    </div>
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">500K+</div>
                        <div className="text-muted-foreground text-lg">International Students</div>
                    </div>
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">AUD35K</div>
                        <div className="text-muted-foreground text-lg">Avg Tuition/Year</div>
                    </div>
                </div>

                <div className="text-center mb-24">
                    <Link to="/appointment" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground px-10 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                        Start Your Australia Journey
                        <MapPin className="h-6 w-6" />
                    </Link>
                </div>

                <section className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                        Why Study in Australia?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-center mb-12 leading-relaxed">
                        Australia is well known for its best colleges and universities providing educational facilities to many national and international students. The country's vibrant lifestyle, warm culture, and exceptional educational facilities have drawn students worldwide consistently.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">World-Class Institutions</h3>
                            <p className="text-muted-foreground leading-relaxed">7 of top 100 universities worldwide, high quality education system.</p>
                        </div>
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <Users2 className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">3rd Largest Intl Students</h3>
                            <p className="text-muted-foreground leading-relaxed">Friendly culture, high living standards, part-time work allowed.</p>
                        </div>
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <DollarSign className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Affordable 3-Year Degrees</h3>
                            <p className="text-muted-foreground leading-relaxed">AQF recognized globally, lower costs than USA/UK.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Qualification Requirements (Nepali Students)</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Award className="h-8 w-8 text-primary" />
                                Undergraduate
                            </h3>
                            <ul className="space-y-3 text-lg">
                                <li><strong>IELTS:</strong> 6.0 overall, 5.5 each</li>
                                <li><strong>Academic:</strong> Grade 12 first division</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Award className="h-8 w-8 text-primary" />
                                Postgraduate
                            </h3>
                            <ul className="space-y-3 text-lg">
                                <li><strong>IELTS:</strong> 6.5 overall, 6 each</li>
                                <li><strong>Academic:</strong> 4yr Bachelor 55% / first div</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Cost of Living</h2>
                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        <div className="p-8 bg-gradient-to-b from-yellow-50 to-orange-50 rounded-3xl border text-center">
                            <DollarSign className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                            <div className="text-4xl font-bold mb-2">AUD 21,041</div>
                            <div className="text-lg font-bold mb-1">Student/Year</div>
                        </div>
                        <div className="p-8 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl border text-center">
                            <DollarSign className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                            <div className="text-3xl font-bold mb-2">AUD 7,362</div>
                            <div className="text-lg font-bold mb-1">Partner</div>
                        </div>
                        <div className="p-8 bg-gradient-to-b from-green-50 to-emerald-50 rounded-3xl border text-center">
                            <DollarSign className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                            <div className="text-3xl font-bold mb-2">AUD 3,152</div>
                            <div className="text-lg font-bold mb-1">Child</div>
                        </div>
                    </div>
                </section>

                <div className="text-center mb-24">
                    <Link to="/appointment" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground px-10 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                        Start Your Australia Journey
                        <MapPin className="h-6 w-6" />
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default StudyInAustraliaPage;
