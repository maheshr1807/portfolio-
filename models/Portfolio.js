// ============================================================
// models/Portfolio.js — Mongoose Schema
// Single-document pattern: the whole portfolio is ONE document
// identified by key: 'main'. We always upsert that one doc.
// ============================================================

const mongoose = require('mongoose');

// ---- Sub-schemas ----
const StackLayerSchema = new mongoose.Schema({
  tech:  { type: String, default: '' },
  label: { type: String, default: '' }
}, { _id: false });

const HeroSchema = new mongoose.Schema({
  name:         { type: String, default: 'Mahesh R' },
  roles:        { type: [String], default: [] },
  description:  { type: String, default: '' },
  ctaPrimary:   { label: String, href: String },
  ctaSecondary: { label: String, href: String },
  ctaGhost:     { label: String, href: String },
  stackLayers:  { type: [StackLayerSchema], default: [] }
}, { _id: false });

const StatSchema = new mongoose.Schema({
  label: { type: String, default: '' },
  value: { type: String, default: '' }
}, { _id: false });

const AboutSchema = new mongoose.Schema({
  paragraphs: { type: [String], default: [] },
  stats:      { type: [StatSchema], default: [] }
}, { _id: false });

const SkillGroupSchema = new mongoose.Schema({
  category: { type: String, default: '' },
  chips:    { type: [String], default: [] }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  id:          { type: String, default: '' },
  title:       { type: String, default: '' },
  category:    { type: String, default: '' },
  description: { type: String, default: '' },
  image:       { type: String, default: '' },
  techs:       { type: [String], default: [] },
  features:    { type: [String], default: [] },
  liveLink:    { type: String, default: '' },
  sourceLink:  { type: String, default: '' }
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  desc:  { type: String, default: '' }
}, { _id: false });

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  body:  { type: String, default: '' }
}, { _id: false });

const TestimonialSchema = new mongoose.Schema({
  quote:  { type: String, default: '' },
  author: { type: String, default: '' }
}, { _id: false });

const ContactSchema = new mongoose.Schema({
  name:          { type: String, default: '' },
  email:         { type: String, default: '' },
  phone:         { type: String, default: '' },
  linkedin:      { type: String, default: '' },
  linkedinLabel: { type: String, default: '' },
  github:        { type: String, default: '' },
  githubLabel:   { type: String, default: '' },
  whatsapp:      { type: String, default: '' }
}, { _id: false });

// ---- Main Portfolio Schema ----
const PortfolioSchema = new mongoose.Schema({
  key:          { type: String, default: 'main', unique: true },
  hero:         { type: HeroSchema,          default: () => ({}) },
  about:        { type: AboutSchema,         default: () => ({}) },
  skills:       { type: [SkillGroupSchema],  default: [] },
  projects:     { type: [ProjectSchema],     default: [] },
  services:     { type: [ServiceSchema],     default: [] },
  experience:   { type: ExperienceSchema,    default: () => ({}) },
  testimonials: { type: [TestimonialSchema], default: [] },
  contact:      { type: ContactSchema,       default: () => ({}) }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
