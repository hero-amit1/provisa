import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import usaImg from "@/assets/usa.jpg";
import {
    MapPin, GraduationCap, Users, DollarSign,
    BookOpen, Users2, Briefcase, Globe, Award, Shield, Calendar, FileText
} from "lucide-react";

const StudyInUSAPage = () => {
    return (
        <Layout>
            {/* Hero with USA Photo */}
            <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src={usaImg}
                    alt="USA Study Abroad"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
                    <div className="section-container">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">
                            Study in USA 🇺🇸
                        </h1>
                        <p className="text-xl md:text-2xl max-w-2xl opacity-95 leading-relaxed">
                            High-quality education, diverse culture, vast research opportunities
                        </p>
                    </div>
                </div>
            </section>

            <div className="section-container py-20">
                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">5,000+</div>
                        <div className="text-muted-foreground text-lg">Universities</div>
                    </div>
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">1M+</div>
                        <div className="text-muted-foreground text-lg">International Students</div>
                    </div>
                    <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
                        <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
                        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">$35K</div>
                        <div className="text-muted-foreground text-lg">Avg Tuition/Year</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mb-24">
                    <Link to="/appointment" className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground px-10 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                        Start Your USA Journey
                        <MapPin className="h-6 w-6" />
                    </Link>
                </div>

                {/* 1. Why Study */}
                <section className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                        Why Study in the USA?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Quality Education</h3>
                            <p className="text-muted-foreground">Home to world's top universities, globally recognized degrees.</p>
                        </div>
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <Users2 className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Diverse Culture</h3>
                            <p className="text-muted-foreground">Melting pot of cultures, rich inclusive environment.</p>
                        </div>
                        <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                            <Briefcase className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Career Opportunities</h3>
                            <p className="text-muted-foreground">Internships, OPT, H1B visa, post-grad employment.</p>
                        </div>
                    </div>
                </section>

                {/* Top Universities */}
                <section className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Top Universities & Popular Programs</h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Award className="h-8 w-8 text-primary" />
                                Top Universities
                            </h3>
                            <ul className="space-y-2 text-lg">
                                <li>• Harvard University</li>
                                <li>• Stanford University</li>
                                <li>• MIT</li>
                                <li>• Caltech</li>
                                <li>• University of Chicago</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <BookOpen className="h-8 w-8 text-primary" />
                                Popular Programs
                            </h3>
                            <ul className="space-y-2 text-lg">
                                <li>• Business & Management</li>
                                <li>• Engineering & Technology</li>
                                <li>• Computer Science</li>
                                <li>• Health Sciences & Medicine</li>
                                <li>• Social Sciences</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Visa & Application */}
                <section className="space-y-16 mb-24">
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Student Visa (F-1/M-1)</h2>
                            <div className="space-y-4 text-lg">
                                <div>• I-20 form, passport, DS-160, fee receipt</div>
                                <div>• Proof of funds for tuition & living</div>
                                <div>• Ties to home country, interview required</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-primary/5 to-orange-500/5 p-8 md:p-12 rounded-3xl border">
                            <FileText className="h-20 w-20 text-primary mx-auto mb-6 opacity-75" />
                            <p className="text-center text-2xl font-bold text-foreground mb-4">Visa Interview</p>
                        </div>
                    </section>

                    <section className="bg-gradient-to-r from-muted/50 to-background/50 p-12 rounded-4xl -mx-6 md:-mx-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Cost of Living</h2>
                        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="p-8 bg-gradient-to-b from-orange-50 to-red-50 rounded-3xl border text-center">
                                <DollarSign className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                                <div className="text-4xl font-bold mb-2">$20-50K</div>
                                <div className="text-lg font-bold mb-1">Tuition/Year</div>
                            </div>
                            <div className="p-8 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl border text-center">
                                <DollarSign className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                                <div className="text-3xl font-bold mb-2">$1-2K</div>
                                <div className="text-lg font-bold mb-1">Monthly Living</div>
                            </div>
                            <div className="p-8 bg-gradient-to-b from-green-50 to-emerald-50 rounded-3xl border text-center">
                                <Shield className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                                <div className="text-xl font-bold mb-2">Health Insurance</div>
                                <div className="text-muted-foreground">Mandatory</div>
                            </div>
                        </div>
                    </section>

                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Working While Studying</h2>
                            <div className="space-y-4 text-lg">
                                <div>• On-campus: 20 hrs/week during term</div>
                                <div>• Off-campus: CPT/OPT after 1st year</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 p-8 rounded-3xl border border-emerald-200">
                            <Briefcase className="h-20 w-20 text-emerald-500 mx-auto mb-6" />
                            <p className="text-center text-2xl font-bold mb-4">F-1 Visa Work</p>
                        </div>
                    </section>
                </section>

                {/* Post-Grad */}
                <section className="mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Post-Graduation Opportunities</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group p-8 text-center rounded-3xl bg-gradient-to-b from-blue-50 to-indigo-50 border hover:shadow-xl">
                            <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-500 group-hover:rotate-12 transition-transform" />
                            <h3 className="text-2xl font-bold mb-3">OPT (1-3 years)</h3>
                            <p className="text-muted-foreground">Work authorization</p>
                        </div>
                        <div className="group p-8 text-center rounded-3xl bg-gradient-to-b from-purple-50 to-violet-50 border hover:shadow-xl">
                            <Briefcase className="h-16 w-16 mx-auto mb-4 text-purple-500 group-hover:rotate-12 transition-transform" />
                            <h3 className="text-2xl font-bold mb-3">H-1B Visa</h3>
                            <p className="text-muted-foreground">Specialty employment</p>
                        </div>
                        <div className="group p-8 text-center rounded-3xl bg-gradient-to-b from-green-50 to-emerald-50 border hover:shadow-xl">
                            <Globe className="h-16 w-16 mx-auto mb-4 text-emerald-500 group-hover:rotate-12 transition-transform" />
                            <h3 className="text-2xl font-bold mb-3">Green Card</h3>
                            <p className="text-muted-foreground">Permanent residency paths</p>
                        </div>
                    </div>
                </section>

                <div className="text-center mt-24 pt-20 border-t border-border">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
                        Ready for USA?
                    </h2>
                    <Link to="/appointment" className="inline-flex items-center gap-4 bg-gradient-to-r from-primary via-orange-500 to-red-500 text-primary-foreground px-12 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
                        Book Consultation
                        <MapPin className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default StudyInUSAPage;

