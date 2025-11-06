// scripts/seed.js
const { connectDB } = require('../src/db');
const User = require('../src/models/User');
const Book = require('../src/models/Book');
const Listing = require('../src/models/Listing');

async function seed() {
  await connectDB();
  await User.deleteMany({});
  await Book.deleteMany({});
  await Listing.deleteMany({});

  const alice = new User({ username:'alice', email:'alice@uni.edu', fullName:'Alice', university:'Uni A' });
  await alice.setPassword('password123');
  alice.verifiedStudent = true;
  await alice.save();

  const book = await Book.create({ title:'Intro to Algorithms', author:'Cormen', isbn:'9780262033848', edition:'3rd', subject:'CS', courseCode:'CS101' });

  await Listing.create({ book: book._id, seller: alice._id, price: 600, condition: 'Good', negotiable: true, location: 'Campus A' });

  console.log('Seed done');
  process.exit(0);
}
seed();
