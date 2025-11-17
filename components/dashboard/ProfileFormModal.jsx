'use client';
import { useState, useEffect } from 'react';
import { X, Loader2, Trash2, Plus, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

const initialPersonalInfo = {
  name: '',
  bio: '',
  designation: '',
  location: '',
  website: '',
  email: '',
  phone: '',
  github: '',
  linkedin: '',
  twitter: '',
};

const initialFormState = {
  personal: initialPersonalInfo,
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certification: [],
  customSections: [],
};

const initialEducation = {
  institution: '',
  degree: '',
  fieldOfStudy: '',
  startDate: '',
  endDate: '',
  grade: '',
  description: '',
  isCurrent: false,
};

const initialExperience = {
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  responsibilities: [],
  technologies: [],
  isCurrent: false,
};

const initialCertification = {
  name: "",
  issuer: "",
  issueDate: "",
  link: "",
};

const initialProject = {
  name: '',
  description: '',
  link: '',
  github: '',
  technologies: [],
  startDate: '',
  endDate: '',
  isCurrent: false,
};

const initialSkill = {
  name: '',
  level: 'intermediate',
  category: '',
};

// Simple custom field structure for frontend
const initialCustomField = {
  fieldName: '',
  fieldType: 'text',
  fieldValue: '',
  fieldOptions: [],
};

const ProfileFormModal = ({
  isOpen,
  onClose,
  editingProfile,
  onSave,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [newCertification, setNewCertification] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [draggedSection, setDraggedSection] = useState(null);
  const [sectionOrder, setSectionOrder] = useState([
    'personal',
    'education',
    'experience',
    'projects',
    'skills',
    'certification',
    'customSections',
  ]);
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    education: false,
    experience: false,
    projects: false,
    skills: false,
    certification: false,
    customSections: false,
  });

  // Helper function to convert customSections to simple custom fields for frontend
  const customSectionsToFields = (customSections) => {
    if (!customSections || !Array.isArray(customSections)) return [];

    return customSections.map(section => {
      // Extract the first item's value if it exists
      const firstItem = section.items && section.items[0];
      const fieldValue = firstItem?.fields?.value || '';

      return {
        fieldName: section.name || '',
        fieldType: mapSchemaTypeToFieldType(section.fieldsSchema?.[0]?.type) || 'text',
        fieldValue: fieldValue,
        fieldOptions: [], // You might need to handle this based on your data
      };
    });
  };

  // Helper function to convert simple custom fields to customSections for backend
  const fieldsToCustomSections = (customFields) => {
    if (!customFields || !Array.isArray(customFields)) return [];

    return customFields.map((field, index) => ({
      name: field.fieldName || `Custom Field ${index + 1}`,
      label: field.fieldName || `Custom Field ${index + 1}`,
      order: index,
      fieldsSchema: [{
        name: 'value',
        type: mapFieldTypeToSchemaType(field.fieldType)
      }],
      items: [{
        order: 0,
        fields: {
          value: field.fieldValue || ''
        }
      }]
    }));
  };

  // Type mapping helpers
  const mapFieldTypeToSchemaType = (fieldType) => {
    const typeMap = {
      'text': 'string',
      'textarea': 'string',
      'url': 'string',
      'date': 'date',
      'select': 'string'
    };
    return typeMap[fieldType] || 'string';
  };

  const mapSchemaTypeToFieldType = (schemaType) => {
    const typeMap = {
      'string': 'text',
      'date': 'date'
    };
    return typeMap[schemaType] || 'text';
  };

  useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(() => {
      const editingData = editingProfile || {};
      console.log(editingData);

      // ---- 1) Frontend simple-field conversion (existing behavior) ----
      const customFields = customSectionsToFields(editingData.customSections || []);

      let fixedOrder;

if (editingData.sectionOrder && Array.isArray(editingData.sectionOrder)) {
  // edit mode
  fixedOrder = editingData.sectionOrder.map(k =>
    k === 'customFields' ? 'customSections' : k
  );
} else {
  // create mode
  fixedOrder = [
    'personal',
    'education',
    'experience',
    'projects',
    'skills',
    'certification',
    'customSections',
  ];
}

      // Convert old 'customFields' → 'customSections'
      fixedOrder = fixedOrder.map((key) =>
        key === "customFields" ? "customSections" : key
      );

      // Ensure customSections EXISTS
      if (!fixedOrder.includes("customSections")) {
        fixedOrder.push("customSections");
      }

      // Remove duplicates
      fixedOrder = [...new Set(fixedOrder)];

      // // ---- 3) Push fixed state ----
      // setFormData({
      //   ...initialFormState,
      //   ...editingData,
      //   customSections: customFields,
      // });
      
      setFormData({
  ...initialFormState,
  ...editingData,
  education: (editingData.education || []).map(e => ({
    ...e,
    startDate: toInputDate(e.startDate),
    endDate: toInputDate(e.endDate),
    isCurrent: !e.endDate, // true if endDate missing
  })),
  experience: (editingData.experience || []).map(e => ({
    ...e,
    startDate: toInputDate(e.startDate),
    endDate: toInputDate(e.endDate),
    isCurrent: !e.endDate,
  })),
  projects: (editingData.projects || []).map(p => ({
    ...p,
    startDate: toInputDate(p.startDate),
    endDate: toInputDate(p.endDate),
    isCurrent: !p.endDate,
  })),
  customSections: customFields,
});


      setSectionOrder(fixedOrder);

      // Reset temp inputs
      setNewCertification("");
      setNewResponsibility("");
      setNewTechnology("");
    }, 0);

    return () => clearTimeout(timeout);
  }, [isOpen, editingProfile]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Convert simple fields back to customSections structure for saving
      const saveData = {
        ...formData,
        sectionOrder,
        customSections: fieldsToCustomSections(formData.customSections),
      };

      console.log('Saving data with customSections:', saveData.customSections);
      await onSave(saveData);
      onClose();
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // // Update all your existing functions to work with customSections instead of customFields
  // const updateField = (key, value) => {
  //   setFormData((prev) => ({ ...prev, [key]: value }));
  // };
  
  const toInputDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d)) return "";
  return d.toISOString().split("T")[0];
};


  const addItem = (key, item) => {
    setFormData((prev) => {
      const list = prev[key] || [];
      if (list.length > 0 && isObjectEmpty(list[list.length - 1])) {
        return prev;
      }
      return {
        ...prev,
        [key]: [...list, item],
      };
    });
  };

  const updatePersonalField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      }
    }));
  };

  const isObjectEmpty = (obj) => {
    return Object.values(obj || {}).every((v) => {
      if (Array.isArray(v)) return v.length === 0;
      return v === "" || v === null || v === undefined;
    });
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

  // Section drag and drop handlers
  const handleSectionDragStart = (e, section) => {
    setDraggedSection(section);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSectionDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleSectionDrop = (e, targetSection) => {
    e.preventDefault();

    if (!draggedSection || draggedSection === targetSection) {
      setDraggedSection(null);
      return;
    }

    setSectionOrder(prev => {
      const newOrder = [...prev];
      const draggedIdx = newOrder.indexOf(draggedSection);
      const targetIdx = newOrder.indexOf(targetSection);

      const [movedSection] = newOrder.splice(draggedIdx, 1);
      newOrder.splice(targetIdx, 0, movedSection);

      return newOrder;
    });

    setDraggedSection(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white">
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
            {sectionOrder.map((sectionKey) => {
              if (sectionKey === 'personal') {
                return (
                  <section
                    key="personal"
                    className="card bg-base-200 p-6"
                    draggable
                    onDragStart={(e) => handleSectionDragStart(e, 'personal')}
                    onDragOver={handleSectionDragOver}
                    onDrop={(e) => handleSectionDrop(e, 'personal')}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection('personal')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-base-content/50 cursor-grab active:cursor-grabbing" />
                        <h3 className="text-lg font-semibold text-base-content">Personal Information</h3>
                      </div>
                      {expandedSections.personal ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {expandedSections.personal && (
                      <div className="mt-4 space-y-4">
                        {/* Name + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label">Full Name</label>
                            <input
                              className="input input-bordered w-full"
                              value={formData.personal.name}
                              onChange={(e) => updatePersonalField("name", e.target.value)}
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <label className="label">Email</label>
                            <input
                              type="email"
                              className="input input-bordered w-full"
                              value={formData.personal.email}
                              onChange={(e) => updatePersonalField("email", e.target.value)}
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        {/* Designation */}
                        <div>
                          <label className="label">Designation</label>
                          <input
                            className="input input-bordered w-full"
                            value={formData.personal.designation}
                            onChange={(e) => updatePersonalField("designation", e.target.value)}
                            placeholder="Full Stack Developer"
                          />
                        </div>

                        {/* Bio */}
                        <div>
                          <label className="label">Bio</label>
                          <textarea
                            className="textarea textarea-bordered w-full"
                            rows={4}
                            value={formData.personal.bio}
                            onChange={(e) => updatePersonalField("bio", e.target.value)}
                            placeholder="A short introduction about yourself..."
                          />
                        </div>

                        {/* Location + Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label">Location</label>
                            <input
                              className="input input-bordered w-full"
                              value={formData.personal.location}
                              onChange={(e) => updatePersonalField("location", e.target.value)}
                              placeholder="City, Country"
                            />
                          </div>

                          <div>
                            <label className="label">Phone</label>
                            <input
                              className="input input-bordered w-full"
                              value={formData.personal.phone}
                              onChange={(e) => updatePersonalField("phone", e.target.value)}
                              placeholder="+91 9876543210"
                            />
                          </div>
                        </div>

                        {/* Socials */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["website", "github", "linkedin", "twitter"].map((field) => (
                            <div key={field}>
                              <label className="label capitalize">{field}</label>
                              <input
                                className="input input-bordered w-full"
                                value={formData.personal[field] || ""}
                                onChange={(e) => updatePersonalField(field, e.target.value)}
                                placeholder={`Enter ${field} URL`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                );
              }

              if (sectionKey === 'education') {
                return (
                  <section
                    key="education"
                    className="card bg-base-200 p-6"
                    draggable
                    onDragStart={(e) => handleSectionDragStart(e, 'education')}
                    onDragOver={handleSectionDragOver}
                    onDrop={(e) => handleSectionDrop(e, 'education')}
                  >
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => toggleSection('education')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-base-content/50 cursor-grab active:cursor-grabbing" />
                          <h3 className="text-lg font-semibold text-base-content">Education</h3>
                        </div>
                        {expandedSections.education ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      <button
                        type="button"
                        disabled={
                          formData.education.length > 0 &&
                          isObjectEmpty(formData.education[formData.education.length - 1])
                        }
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
                                   disabled={edu.isCurrent}
                                  value={edu.endDate || ''}
                                  onChange={(e) => updateNestedItem('education', idx, 'endDate', e.target.value)}
                                  className="input input-bordered w-full"
                                />
                                 <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="checkbox"
                                    checked={edu.isCurrent}
                                    onChange={(e) => {
                                      updateNestedItem('education', idx, "isCurrent", e.target.checked);
                                      if (e.target.checked) {
                                        updateNestedItem('education', idx, "endDate", "");
                                      }
                                    }}
                                  />
                                  <span className="text-sm">Currently Working / Studying</span>
                                </div>
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
                );
              }

              if (sectionKey === 'experience') {
                return (
                  <section
                    key="experience"
                    className="card bg-base-200 p-6"
                    draggable
                    onDragStart={(e) => handleSectionDragStart(e, 'experience')}
                    onDragOver={handleSectionDragOver}
                    onDrop={(e) => handleSectionDrop(e, 'experience')}
                  >
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => toggleSection('experience')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-base-content/50 cursor-grab active:cursor-grabbing" />
                          <h3 className="text-lg font-semibold text-base-content">Work Experience</h3>
                        </div>
                        {expandedSections.experience ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      <button
                        type="button"
                        disabled={
                          formData.experience.length > 0 &&
                          isObjectEmpty(formData.experience[formData.experience.length - 1])
                        }
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
                                  disabled={exp.isCurrent}
                                  value={exp.endDate || ''}
                                  onChange={(e) => updateNestedItem('experience', idx, 'endDate', e.target.value)}
                                  className="input input-bordered w-full"
                                />
                                 <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="checkbox"
                                    checked={exp.isCurrent}
                                    onChange={(e) => {
                                      updateNestedItem('experience', idx, "isCurrent", e.target.checked);
                                      if (e.target.checked) {
                                        updateNestedItem('experience', idx, "endDate", "");
                                      }
                                    }}
                                  />
                                  <span className="text-sm">Currently Working</span>
                                </div>
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
                );
              }

              if (sectionKey === 'projects') {
                return (
                  <section
                    key="projects"
                    className="card bg-base-200 p-6"
                    draggable
                    onDragStart={(e) => handleSectionDragStart(e, 'projects')}
                    onDragOver={handleSectionDragOver}
                    onDrop={(e) => handleSectionDrop(e, 'projects')}
                  >
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => toggleSection('projects')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-base-content/50 cursor-grab active:cursor-grabbing" />
                          <h3 className="text-lg font-semibold text-base-content">Projects</h3>
                        </div>
                        {expandedSections.projects ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      <button
                        type="button"
                        disabled={
                          formData.projects.length > 0 &&
                          isObjectEmpty(formData.projects[formData.projects.length - 1])
                        }
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
                                  disabled={project.isCurrent}
                                  value={project.endDate || ''}
                                  onChange={(e) => updateNestedItem('projects', idx, 'endDate', e.target.value)}
                                  className="input input-bordered w-full"
                                />
                                 <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="checkbox"
                                    checked={project.isCurrent}
                                    onChange={(e) => {
                                      updateNestedItem('projects', idx, "isCurrent", e.target.checked);
                                      if (e.target.checked) {
                                        updateNestedItem('projects', idx, "endDate", "");
                                      }
                                    }}
                                  />
                                  <span className="text-sm">Currently Working / Studying</span>
                                </div>
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
                );
              }

              if (sectionKey === 'skills') {
                return (
                  <section
                    key="skills"
                    className="card bg-base-200 p-6"
                    draggable
                    onDragStart={(e) => handleSectionDragStart(e, 'skills')}
                    onDragOver={handleSectionDragOver}
                    onDrop={(e) => handleSectionDrop(e, 'skills')}
                  >
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => toggleSection('skills')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-base-content/50 cursor-grab active:cursor-grabbing" />
                          <h3 className="text-lg font-semibold text-base-content">Skills</h3>
                        </div>
                        {expandedSections.skills ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      <button
                        type="button"
                        disabled={
                          formData.skills.length > 0 &&
                          isObjectEmpty(formData.skills[formData.skills.length - 1])
                        }
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
                );
              }

              if (sectionKey === 'certification') {
                return (
                  <section
                    key="certification"
                    className="card bg-base-200 p-6"
                    draggable
                    onDragStart={(e) => handleSectionDragStart(e, 'certification')}
                    onDragOver={handleSectionDragOver}
                    onDrop={(e) => handleSectionDrop(e, 'certification')}
                  >
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => toggleSection('certification')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-base-content/50 cursor-grab active:cursor-grabbing" />
                          <h3 className="text-lg font-semibold text-base-content">Certifications</h3>
                        </div>
                        {expandedSections.certification ? <ChevronUp /> : <ChevronDown />}
                      </button>
                      <button
                        type="button"
                        disabled={
                          formData.certification.length > 0 &&
                          isObjectEmpty(formData.certification[formData.certification.length - 1])
                        }
                        className="btn btn-primary btn-sm ml-4"
                        onClick={() => addItem('certification', { ...initialCertification })}
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>

                    {expandedSections.certification && (
                      <div className="mt-4 space-y-4">
                        {formData.certification?.map((cert, idx) => (
                          <div key={idx} className="card bg-base-100 p-4 border border-base-300">
                            {/* Name */}
                            <div className="space-y-2">
                              <label className="label">Certification Name</label>
                              <input
                                className="input input-bordered w-full"
                                value={cert.name}
                                onChange={(e) => updateNestedItem("certification", idx, "name", e.target.value)}
                                placeholder="AWS Solutions Architect"
                              />
                            </div>

                            {/* Issuer */}
                            <div className="space-y-2 mt-2">
                              <label className="label">Issuer</label>
                              <input
                                className="input input-bordered w-full"
                                value={cert.issuer}
                                onChange={(e) => updateNestedItem("certification", idx, "issuer", e.target.value)}
                                placeholder="Amazon Web Services"
                              />
                            </div>

                            {/* Issue Date */}
                            <div className="space-y-2 mt-2">
                              <label className="label">Issue Date</label>
                              <input
                                type="date"
                                className="input input-bordered w-full"
                                value={cert.issueDate}
                                onChange={(e) => updateNestedItem("certification", idx, "issueDate", e.target.value)}
                              />
                            </div>

                            {/* Link */}
                            <div className="space-y-2 mt-2">
                              <label className="label">Certificate URL</label>
                              <input
                                className="input input-bordered w-full"
                                value={cert.link}
                                onChange={(e) => updateNestedItem("certification", idx, "link", e.target.value)}
                                placeholder="https://credential.net/xyz"
                              />
                            </div>

                            <div className="flex justify-end mt-3 pt-3 border-t border-base-300">
                              <button
                                type="button"
                                onClick={() => removeItem('certification', idx)}
                                className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                              >
                                <Trash2 className="w-4 h-4" /> Remove
                              </button>
                            </div>
                          </div>
                        ))}

                        {(!formData.certification || formData.certification.length === 0) && (
                          <div className="text-center text-base-content/60 py-8">
                            No certifications added yet.
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                );
              }

              if (sectionKey === "customSections") {
                return (
                  <section
                    key="customSections"
                    className="card bg-base-200 p-6"
                    draggable
                    onDragStart={(e) => handleSectionDragStart(e, "customSections")}
                    onDragOver={handleSectionDragOver}
                    onDrop={(e) => handleSectionDrop(e, "customSections")}
                  >
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() =>
                          toggleSection("customSections")
                        }
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-base-content/50 cursor-grab" />
                          <h3 className="text-lg font-semibold text-base-content">
                            Custom Sections
                          </h3>
                        </div>

                        {expandedSections.customSections ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>

                      <button
                        type="button"
                        className="btn btn-primary btn-sm ml-4"
                        onClick={() =>
                          addItem("customSections", {
                            fieldName: "",
                            fieldType: "text",
                            fieldValue: "",
                            fieldOptions: [],
                          })
                        }
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>

                    {expandedSections.customSections && (
                      <div className="mt-4 space-y-4">
                        {formData.customSections?.map((field, idx) => (
                          <div
                            key={idx}
                            className="card bg-base-100 p-4 border border-base-300"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="label">Field Name</label>
                                <input
                                  className="input input-bordered w-full"
                                  value={field.fieldName}
                                  onChange={(e) =>
                                    updateNestedItem(
                                      "customSections",
                                      idx,
                                      "fieldName",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <div>
                                <label className="label">Field Type</label>
                                <select
                                  className="select select-bordered w-full"
                                  value={field.fieldType}
                                  onChange={(e) =>
                                    updateNestedItem(
                                      "customSections",
                                      idx,
                                      "fieldType",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="text">Text</option>
                                  <option value="textarea">Textarea</option>
                                  <option value="url">URL</option>
                                  <option value="date">Date</option>
                                  <option value="select">Dropdown</option>
                                </select>
                              </div>
                            </div>

                            {field.fieldType === "select" && (
                              <div className="mt-3">
                                <label className="label">Options</label>
                                <input
                                  className="input input-bordered w-full"
                                  value={field.fieldOptions.join(", ")}
                                  onChange={(e) =>
                                    updateNestedItem(
                                      "customSections",
                                      idx,
                                      "fieldOptions",
                                      e.target.value.split(",").map((o) => o.trim())
                                    )
                                  }
                                  placeholder="Option 1, Option 2"
                                />

                                <label className="label mt-2">Selected</label>
                                <select
                                  className="select select-bordered w-full"
                                  value={field.fieldValue}
                                  onChange={(e) =>
                                    updateNestedItem(
                                      "customSections",
                                      idx,
                                      "fieldValue",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">-- Select --</option>
                                  {field.fieldOptions.map((opt, i) => (
                                    <option key={i} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {field.fieldType !== "select" && (
                              <div className="mt-3">
                                <label className="label">Value</label>

                                {field.fieldType === "textarea" ? (
                                  <textarea
                                    className="textarea textarea-bordered w-full"
                                    rows={4}
                                    value={field.fieldValue}
                                    onChange={(e) =>
                                      updateNestedItem(
                                        "customSections",
                                        idx,
                                        "fieldValue",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  <input
                                    type={field.fieldType}
                                    className="input input-bordered w-full"
                                    value={field.fieldValue}
                                    onChange={(e) =>
                                      updateNestedItem(
                                        "customSections",
                                        idx,
                                        "fieldValue",
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                              </div>
                            )}

                            <div className="flex justify-end mt-3 pt-3 border-t border-base-300">
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem("customSections", idx)
                                }
                                className="btn btn-ghost btn-sm text-error"
                              >
                                <Trash2 className="w-4 h-4" /> Remove
                              </button>
                            </div>
                          </div>
                        ))}

                        {formData.customSections?.length === 0 && (
                          <div className="text-center text-base-content/60 py-8">
                            No custom sections added yet.
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                );
              }
              return null;
            })}

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
