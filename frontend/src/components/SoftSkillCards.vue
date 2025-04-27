<template>
    <div class="skill-container">
      <div class="overflow-x-auto">
        <div class="flex gap-4 pb-2">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="skill-card"
          >
            <h3 class="skill-title">{{ skill.name }}</h3>
            
            <div class="circular-progress-container">
              <svg class="circular-progress" width="80" height="80" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="#E5E7EB" 
                  stroke-width="10"
                />
  
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  :stroke="getScoreColor(skill.score)" 
                  stroke-width="10" 
                  :stroke-dasharray="`${calculateDashArray(skill.score)} 251.2`" 
                  stroke-dashoffset="0" 
                  transform="rotate(-90 50 50)"
                />
             
                <text x="50" y="50" font-size="20" text-anchor="middle" alignment-baseline="middle" font-weight="bold">
                  {{ skill.score }}
                </text>
                <text x="50" y="65" font-size="12" text-anchor="middle" alignment-baseline="middle">
                  /5
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const skills = [
      { name: 'Adaptability', score: 4.9 },
      { name: 'Analysis', score: 3.5 },
      { name: 'Teamwork', score: 2.7 },
      { name: 'Organization', score: 4.2 },
      { name: 'Communication', score: 1.8 },
      { name: 'Leadership', score: 4.5 },
      { name: 'Problem Solving', score: 3.2 },
      { name: 'Creativity', score: 2.5 },
    ];
  
    const calculateDashArray = (score) => {
      
      const circumference = 2 * Math.PI * 40;
      
      return (score / 5) * circumference;
    };
  
    const getScoreColor = (score) => {
      if (score >= 4) return '#10B981'; // Green
      if (score >= 3) return '#F59E0B'; // Yellow
      if (score >= 2) return '#EF4444'; // Red
      return '#6B7280'; // Gray
    };
  </script>
  
  <style scoped>
  .skill-container {
    width: 100%;
    overflow-x: auto;
    padding: 1.5rem;
    margin-bottom: 1rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
  
  .skill-card {
    background: white;
    padding: 1rem;
    border-radius: 0.75rem;
    min-width: 150px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }
  
  .skill-card:hover {
    transform: translateY(-2px);
  }
  
  .circular-progress-container {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
  
  .circular-progress {
    transform: rotate(-180deg);
    transform-origin: 50% 50%;
  }
  
  .skill-title {
    font-weight: 600;
    font-size: 0.875rem;
    color: #1F2937;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F3F4F6;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  /* Custom scrollbar */
  .overflow-x-auto::-webkit-scrollbar {
    height: 6px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-track {
    background: #F3F4F6;
    border-radius: 3px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #9CA3AF;
  }
  </style>