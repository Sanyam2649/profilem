'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, Trash2, Plus, ChevronDown, ChevronUp} from 'lucide-react';

const initialFormState = {
  name: '',
  email: '',
  bio: '',
  location: '',
  website: '',
  phone: '',
  github: '',
  linkedin: '',
  twitter: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
};

const initialEducation = {
  institution: '',
  degree: '',
  fieldOfStudy: '',
  startDate: '',
  endDate: '',
  grade: '',
  description: '',
};

const initialExperience = {
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  responsibilities: [],
  technologies: [],
};

const initialProject = {
  name: '',
  description: '',
  link: '',
  github: '',
  technologies: [],
  startDate: '',
  endDate: '',
};

const initialSkill = {
  name: '',
  level: 'intermediate',
  category: '',
};

const ProfileFormModal = ({
  isOpen,
  onClose,
  editingProfile,
  onSave,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [newInterest, setNewInterest] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    education: false,
    experience: false,
    projects: false,
    skills: false,
  });

  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => {
      setFormData(editingProfile ? { ...initialFormState, ...editingProfile } : initialFormState);
      setNewInterest('');
      setNewCertification('');
      setNewResponsibility('');
      setNewTechnology('');
    }, 0);
    return () => clearTimeout(timeout);
  }, [isOpen, editingProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (key ,value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = (key, item) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), item],
    }));
  };

  const removeItem = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key]).filter((_, i) => i !== index),
    }));
  };

  const updateNestedItem = (key, index, field, value) => {
    setFormData((prev) => {
      const items = [...prev[key]];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [key]: items };
    });
  };

  const addArrayItem = (key, itemIndex, arrayKey, value) => {
    if (!value.trim()) return;
    setFormData((prev) => {
      const items = [...prev[key]];
      const currentArray = items[itemIndex][arrayKey] || [];
      items[itemIndex] = {
        ...items[itemIndex],
        [arrayKey]: [...currentArray, value.trim()]
      };
      return { ...prev, [key]: items };
    });
  };

  const removeArrayItem = (key, itemIndex, arrayKey, arrayIndex) => {
    setFormData((prev) => {
      const items = [...prev[key]];
      const currentArray = items[itemIndex][arrayKey] || [];
      items[itemIndex] = {
        ...items[itemIndex],
        [arrayKey]: currentArray.filter((_, i) => i !== arrayIndex)
      };
      return { ...prev, [key]: items };
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-base-100 p-6 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-base-300">
          <h2 className="text-2xl font-bold text-base-content">
            {editingProfile ? 'Edit Profile' : 'Create Profile'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="btn btn-circle btn-ghost btn-sm hover:bg-base-300 transition-colors"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <section className="card bg-base-200 p-6">
              <button
                type="button"
                onClick={() => toggleSection('personal')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-base-content">Personal Information</h3>
                {expandedSections.personal ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {expandedSections.personal && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-medium">Full Name</span>
                      </label>
                      <input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-medium">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-medium">Location</span>
                      </label>
                      <input
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-medium">Phone</span>
                      </label>
                      <input
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label">
                      <span className="label-text font-medium">Bio</span>
                    </label>
                    <textarea
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      className="textarea textarea-bordered w-full h-24"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-medium">Website</span>
                      </label>
                      <input
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-medium">GitHub</span>
                      </label>
                      <input
                        placeholder="https://github.com/username"
                        value={formData.github}
                        onChange={(e) => updateField('github', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-medium">LinkedIn</span>
                      </label>
                      <input
                        placeholder="https://linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={(e) => updateField('linkedin', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Education Section */}
            <section className="card bg-base-200 p-6">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => toggleSection('education')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-base-content">Education</h3>
                  {expandedSections.education ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm ml-4"
                  onClick={() => addItem('education', { ...initialEducation })}
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {expandedSections.education && (
                <div className="mt-4 space-y-4">
                  {formData.education?.map((edu, idx) => (
                    <div key={idx} className="card bg-base-100 p-4 border border-base-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Institution</span>
                          </label>
                          <input
                            placeholder="University Name"
                            value={edu.institution}
                            onChange={(e) => updateNestedItem('education', idx, 'institution', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Degree</span>
                          </label>
                          <input
                            placeholder="Bachelor of Science"
                            value={edu.degree}
                            onChange={(e) => updateNestedItem('education', idx, 'degree', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Field of Study</span>
                          </label>
                          <input
                            placeholder="Computer Science"
                            value={edu.fieldOfStudy}
                            onChange={(e) => updateNestedItem('education', idx, 'fieldOfStudy', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Grade</span>
                          </label>
                          <input
                            placeholder="GPA or Grade"
                            value={edu.grade || ''}
                            onChange={(e) => updateNestedItem('education', idx, 'grade', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Start Date</span>
                          </label>
                          <input
                            type="date"
                            value={edu.startDate}
                            onChange={(e) => updateNestedItem('education', idx, 'startDate', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">End Date</span>
                          </label>
                          <input
                            type="date"
                            value={edu.endDate || ''}
                            onChange={(e) => updateNestedItem('education', idx, 'endDate', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="label">
                            <span className="label-text font-medium">Description</span>
                          </label>
                          <textarea
                            placeholder="Description of your studies, achievements..."
                            value={edu.description || ''}
                            onChange={(e) => updateNestedItem('education', idx, 'description', e.target.value)}
                            className="textarea textarea-bordered w-full"
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 pt-3 border-t border-base-300">
                        <button
                          type="button"
                          onClick={() => removeItem('education', idx)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!formData.education || formData.education.length === 0) && (
                    <div className="text-center text-base-content/60 py-8">
                      No education entries added yet.
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Experience Section */}
            <section className="card bg-base-200 p-6">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => toggleSection('experience')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-base-content">Work Experience</h3>
                  {expandedSections.experience ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm ml-4"
                  onClick={() => addItem('experience', { ...initialExperience })}
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {expandedSections.experience && (
                <div className="mt-4 space-y-4">
                  {formData.experience?.map((exp, idx) => (
                    <div key={idx} className="card bg-base-100 p-4 border border-base-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Company</span>
                          </label>
                          <input
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => updateNestedItem('experience', idx, 'company', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Position</span>
                          </label>
                          <input
                            placeholder="Job Title"
                            value={exp.position}
                            onChange={(e) => updateNestedItem('experience', idx, 'position', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Location</span>
                          </label>
                          <input
                            placeholder="City, Country"
                            value={exp.location || ''}
                            onChange={(e) => updateNestedItem('experience', idx, 'location', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Start Date</span>
                          </label>
                          <input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => updateNestedItem('experience', idx, 'startDate', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">End Date</span>
                          </label>
                          <input
                            type="date"
                            value={exp.endDate || ''}
                            onChange={(e) => updateNestedItem('experience', idx, 'endDate', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="mt-4 space-y-2">
                        <label className="label">
                          <span className="label-text font-medium">Responsibilities</span>
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            placeholder="Add responsibility"
                            value={newResponsibility}
                            onChange={(e) => setNewResponsibility(e.target.value)}
                            className="input input-bordered flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addArrayItem('experience', idx, 'responsibilities', newResponsibility);
                                setNewResponsibility('');
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              addArrayItem('experience', idx, 'responsibilities', newResponsibility);
                              setNewResponsibility('');
                            }}
                            className="btn btn-sm btn-primary"
                          >
                            Add
                          </button>
                        </div>
                        <div className="space-y-1">
                          {exp.responsibilities?.map((resp, respIdx) => (
                            <div key={respIdx} className="flex items-center gap-2 bg-base-200 px-3 py-2 rounded">
                              <span className="flex-1">{resp}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('experience', idx, 'responsibilities', respIdx)}
                                className="btn btn-ghost btn-xs text-error"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mt-4 space-y-2">
                        <label className="label">
                          <span className="label-text font-medium">Technologies Used</span>
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            placeholder="Add technology"
                            value={newTechnology}
                            onChange={(e) => setNewTechnology(e.target.value)}
                            className="input input-bordered flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addArrayItem('experience', idx, 'technologies', newTechnology);
                                setNewTechnology('');
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              addArrayItem('experience', idx, 'technologies', newTechnology);
                              setNewTechnology('');
                            }}
                            className="btn btn-sm btn-primary"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies?.map((tech, techIdx) => (
                            <div key={techIdx} className="badge badge-primary gap-1">
                              {tech}
                              <button
                                type="button"
                                onClick={() => removeArrayItem('experience', idx, 'technologies', techIdx)}
                                className="text-xs hover:text-error"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end mt-3 pt-3 border-t border-base-300">
                        <button
                          type="button"
                          onClick={() => removeItem('experience', idx)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!formData.experience || formData.experience.length === 0) && (
                    <div className="text-center text-base-content/60 py-8">
                      No work experience added yet.
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Projects Section */}
            <section className="card bg-base-200 p-6">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => toggleSection('projects')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-base-content">Projects</h3>
                  {expandedSections.projects ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm ml-4"
                  onClick={() => addItem('projects', { ...initialProject })}
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {expandedSections.projects && (
                <div className="mt-4 space-y-4">
                  {formData.projects?.map((project, idx) => (
                    <div key={idx} className="card bg-base-100 p-4 border border-base-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Project Name</span>
                          </label>
                          <input
                            placeholder="Project Name"
                            value={project.name}
                            onChange={(e) => updateNestedItem('projects', idx, 'name', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Project Link</span>
                          </label>
                          <input
                            placeholder="https://project.com"
                            value={project.link || ''}
                            onChange={(e) => updateNestedItem('projects', idx, 'link', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Github</span>
                          </label>
                          <input
                            placeholder="https://github.com/"
                            value={project.github || ''}
                            onChange={(e) => updateNestedItem('projects', idx, 'github', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Start Date</span>
                          </label>
                          <input
                            type="date"
                            value={project.startDate || ''}
                            onChange={(e) => updateNestedItem('projects', idx, 'startDate', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">End Date</span>
                          </label>
                          <input
                            type="date"
                            value={project.endDate || ''}
                            onChange={(e) => updateNestedItem('projects', idx, 'endDate', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="label">
                            <span className="label-text font-medium">Description</span>
                          </label>
                          <textarea
                            placeholder="Describe the project, your role, and key achievements..."
                            value={project.description}
                            onChange={(e) => updateNestedItem('projects', idx, 'description', e.target.value)}
                            className="textarea textarea-bordered w-full"
                            rows={4}
                          />
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mt-4 space-y-2">
                        <label className="label">
                          <span className="label-text font-medium">Technologies Used</span>
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            placeholder="Add technology"
                            value={newTechnology}
                            onChange={(e) => setNewTechnology(e.target.value)}
                            className="input input-bordered flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addArrayItem('projects', idx, 'technologies', newTechnology);
                                setNewTechnology('');
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              addArrayItem('projects', idx, 'technologies', newTechnology);
                              setNewTechnology('');
                            }}
                            className="btn btn-sm btn-primary"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.map((tech, techIdx) => (
                            <div key={techIdx} className="badge badge-secondary gap-1">
                              {tech}
                              <button
                                type="button"
                                onClick={() => removeArrayItem('projects', idx, 'technologies', techIdx)}
                                className="text-xs hover:text-error"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end mt-3 pt-3 border-t border-base-300">
                        <button
                          type="button"
                          onClick={() => removeItem('projects', idx)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!formData.projects || formData.projects.length === 0) && (
                    <div className="text-center text-base-content/60 py-8">
                      No projects added yet.
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Skills Section */}
            <section className="card bg-base-200 p-6">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => toggleSection('skills')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-base-content">Skills</h3>
                  {expandedSections.skills ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm ml-4"
                  onClick={() => addItem('skills', { ...initialSkill })}
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {expandedSections.skills && (
                <div className="mt-4 space-y-4">
                  {formData.skills?.map((skill, idx) => (
                    <div key={idx} className="card bg-base-100 p-4 border border-base-300">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Skill Name</span>
                          </label>
                          <input
                            placeholder="JavaScript, React, etc."
                            value={skill.name}
                            onChange={(e) => updateNestedItem('skills', idx, 'name', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Category</span>
                          </label>
                          <input
                            placeholder="Frontend, Backend, etc."
                            value={skill.category || ''}
                            onChange={(e) => updateNestedItem('skills', idx, 'category', e.target.value)}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="label">
                            <span className="label-text font-medium">Proficiency Level</span>
                          </label>
                          <select
                            value={skill.level || 'intermediate'}
                            onChange={(e) => updateNestedItem('skills', idx, 'level', e.target.value)}
                            className="select select-bordered w-full"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 pt-3 border-t border-base-300">
                        <button
                          type="button"
                          onClick={() => removeItem('skills', idx)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!formData.skills || formData.skills.length === 0) && (
                    <div className="text-center text-base-content/60 py-8">
                      No skills added yet.
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Interests & Certifications */}
            <section className="grid grid-cols-1 gap-6">
              <div className="card bg-base-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-base-content">Certifications</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      placeholder="Add certification"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      className="input input-bordered flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (!newCertification.trim()) return;
                          addItem('certifications', newCertification.trim());
                          setNewCertification('');
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newCertification.trim()) return;
                        addItem('certifications', newCertification.trim());
                        setNewCertification('');
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications?.map((cert, i) => (
                      <div key={i} className="badge badge-outline badge-lg gap-1 px-3 py-2">
                        {cert}
                        <button
                          type="button"
                          onClick={() => removeItem('certifications', i)}
                          className="text-xs hover:text-error transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-base-300">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormModal;