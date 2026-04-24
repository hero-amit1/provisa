const mongoose = require('mongoose');
const Service = require('./backend/models/Service');
const mongooseURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/provisa';

async function seedServices() {
  await mongoose.connect(mongooseURI);
  console.log('Connected to MongoDB');
  
  await Service.deleteMany({});
  
  const services = [
    { title: 'Study Pathway Consultation', description: 'Personalized study pathway planning and university selection.' },
    { title: 'Interview Preparation', description: 'Mock interviews and coaching for university admissions.' },
    { title: 'Career Counseling', description: 'Career guidance and job market insights.' },
    { title: 'Finance & Scholarship', description: 'Scholarship search and financial planning.' },
    { title: 'Visa Guidance', description: 'Complete visa application assistance.' },
    { title: 'Pre-departure Briefing', description: 'Orientation and pre-departure support.' }
  ];
  
  await Service.insertMany(services);
  console.log('Seeded 6 services');
  process.exit(0);
}

seedServices().catch(console.error);

