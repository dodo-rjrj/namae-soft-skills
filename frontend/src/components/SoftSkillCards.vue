<template>
  <div class="skill-container">
    <div class="overflow-x-auto">
      <div class="flex gap-4 pb-2">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-white p-4 rounded shadow text-center min-w-[150px]"
        >
          <h3 class="mb-2">{{ skill.name }}</h3>
          
          <div class="circular-progress-container">
            <svg class="circular-progress" width="80" height="80" viewBox="0 0 100 100">

              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#FFA500" 
                stroke-width="10"
              />

              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="#8A2BE2" 
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
</script>

<style scoped>
.skill-container {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  height:max-content; 
  border-radius:10px ;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.25);
  padding: 18px;
}

.circular-progress-container {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.circular-progress {
  transform: rotate(-180eg);
  transform-origin: 50% 50%;
}

h3 {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mb-2{
  background-color: #EFF6FC;
  height:max-content; 
  border-radius:10px ;
  padding: 8px;
}
</style>