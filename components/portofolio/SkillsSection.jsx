import {useState } from 'react';
import { Code, Palette, Database, Cloud, Cpu, Globe, Zap, Star, TrendingUp, Award, Filter } from 'lucide-react';

const SkillsSection = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('level');

  const getCategoryIcon = (category) => {
    const icons = {
      'Frontend': Code,
      'Backend': Cpu,
      'Database': Database,
      'Cloud': Cloud,
      'Design': Palette,
      'Mobile': Globe,
      'DevOps': Zap,
      'Programming': Code,
      'Tools': Cpu,
      'Other': Star
    };
    return icons[category] || Code;
  };

  const getSkillLevelColor = (level) => {
    const colors = {
      'expert': 'from-green-500 to-emerald-600',
      'advanced': 'from-blue-500 to-cyan-600',
      'intermediate': 'from-yellow-500 to-amber-600',
      'beginner': 'from-gray-500 to-gray-600',
      'default': 'from-purple-500 to-pink-600'
    };
    return colors[level] || colors.default;
  };

  const getSkillLevelWidth = (level) => {
    const widths = {
      'expert': 'w-full',
      'advanced': 'w-4/5',
      'intermediate': 'w-3/5',
      'beginner': 'w-2/5',
      'default': 'w-1/2'
    };
    return widths[level] || widths.default;
  };

  const getSkillLevelText = (level) => {
    const texts = {
      'expert': 'Expert',
      'advanced': 'Advanced',
      'intermediate': 'Intermediate',
      'beginner': 'Beginner'
    };
    return texts[level] || level;
  };

  const getLevelValue = (level) => {
    const values = {
      'expert': 4,
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1
    };
    return values[level] || 0;
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  // Get all categories
  const categories = ['all', ...Object.keys(groupedSkills)];

  // Filter and sort skills
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);


  const expertSkills = skills.filter(skill => skill.level === 'expert');
  const totalSkills = skills.length;
  const averageLevel = skills.reduce((acc, skill) => {
    return acc + getLevelValue(skill.level);
  }, 0) / totalSkills;

  const categoryStats = Object.entries(groupedSkills).map(([category, categorySkills]) => {
    const avgLevel = categorySkills.reduce((acc, skill) => acc + getLevelValue(skill.level), 0) / categorySkills.length;
    return {
      category,
      count: categorySkills.length,
      avgLevel: (avgLevel / 4) * 100,
      expertCount: categorySkills.filter(s => s.level === 'expert').length
    };
  });

return (
  <section className="relative py-14 sm:py-20 px-4 sm:px-6">
    {/* Soft Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 to-pink-50/60"></div>

    <div className="container mx-auto max-w-7xl relative z-10">

      {/* HEADER */}
      <div className="text-center mb-14 sm:mb-16 px-2">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200/50 mb-5">
          <Zap className="w-5 h-5 text-purple-600" />
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Technical Arsenal
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent leading-tight mb-5">
          Skills & Expertise
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Mastering technologies that power modern digital experiences and drive innovation
        </p>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
        {[
          {
            icon: <Code className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />,
            value: totalSkills,
            label: 'Total Skills',
          },
          {
            icon: <Award className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />,
            value: expertSkills.length,
            label: 'Expert Level',
          },
          {
            icon: <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />,
            value: `${Math.round(averageLevel * 25)}%`,
            label: 'Average Proficiency',
          },
          {
            icon: <Star className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />,
            value: Object.keys(groupedSkills).length,
            label: 'Categories',
          },
        ].map(({ icon, value, label }, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 text-center border border-gray-200/50 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
              {icon}
              <div className="text-3xl sm:text-4xl font-black text-gray-900">{value}</div>
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold">{label}</div>
          </div>
        ))}
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-600 hover:text-gray-900 hover:shadow-md border border-gray-200/50'
              }`}
            >
              {category === 'all' ? 'All Skills' : category}
              {category !== 'all' && (
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {groupedSkills[category].length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-2 border border-gray-200/50 shadow-lg">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-gray-700 font-semibold text-sm sm:text-base"
          >
            <option value="level">Sort by Level</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

      </div>

      {/* SKILLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">

        {Object.entries(groupedSkills)
          .filter(([category]) => selectedCategory === 'all' || category === selectedCategory)
          .map(([category, categorySkills]) => {
            const IconComponent = getCategoryIcon(category);

            const sortedCategorySkills = [...categorySkills].sort((a, b) =>
              sortBy === 'level'
                ? getLevelValue(b.level) - getLevelValue(a.level)
                : a.name.localeCompare(b.name)
            );

            return (
              <div
                key={category}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200/50 hover:border-purple-200 hover:shadow-3xl transition-all duration-500"
              >

                {/* CATEGORY HEADER */}
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900">{category}</h3>
                    <p className="text-gray-500 text-sm sm:text-lg">
                      {categorySkills.length} skill{categorySkills.length !== 1 && 's'}
                    </p>
                  </div>
                </div>

                {/* SKILLS LIST */}
                <div className="space-y-6">
                  {sortedCategorySkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base sm:text-lg font-bold text-gray-800">
                          {skill.name}
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-black bg-gradient-to-r ${getSkillLevelColor(
                            skill.level
                          )} bg-clip-text text-transparent`}
                        >
                          {getSkillLevelText(skill.level)}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
                        <div
                          className={`h-3 rounded-full bg-gradient-to-r ${getSkillLevelColor(
                            skill.level
                          )} transition-all duration-1000 ease-out ${getSkillLevelWidth(
                            skill.level
                          )} shadow-lg`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CATEGORY MASTERY */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <div className="flex justify-between items-center text-gray-600 font-semibold text-xs sm:text-base">
                    <span>Category Mastery</span>
                    <span>
                      {Math.round(
                        categorySkills.reduce((acc, skill) => {
                          const levelVal = getLevelValue(skill.level);
                          return acc + (levelVal / 4) * 100;
                        }, 0) / categorySkills.length
                      )}
                      %
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2 shadow-inner">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out shadow-lg"
                      style={{
                        width: `${categoryStats.find(
                          (stat) => stat.category === category
                        )?.avgLevel || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}

      </div>

      {/* LEGEND */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-gray-200/50 shadow-2xl">
        <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8 text-center">
          Proficiency Scale
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            { level: 'expert', label: 'Expert', description: 'Deep mastery and leadership capability', color: 'from-green-500 to-emerald-600' },
            { level: 'advanced', label: 'Advanced', description: 'Strong production experience', color: 'from-blue-500 to-cyan-600' },
            { level: 'intermediate', label: 'Intermediate', description: 'Comfortable and capable', color: 'from-yellow-500 to-amber-600' },
            { level: 'beginner', label: 'Beginner', description: 'Learning and exploring', color: 'from-gray-500 to-gray-600' },
          ].map((item) => (
            <div
              key={item.level}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-lg hover:scale-[1.03] transition-all"
            >
              <div className={`w-4 h-4 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color}`}></div>
              <div className="font-black text-gray-900 text-lg mb-1">{item.label}</div>
              <div className="text-gray-600 text-sm leading-relaxed">{item.description}</div>
              <div className="mt-3 text-xs font-semibold text-gray-500">
                {skills.filter((s) => s.level === item.level).length} skills
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  </section>
);

};

export default SkillsSection;