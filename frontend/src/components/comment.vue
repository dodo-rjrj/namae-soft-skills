<template>
    <div class="table-container">
      <div class="header">
                      <strong>Latest Feedbacks</strong>
                      <button class="view-more" @click="onViewMore">View more</button>
                    </div>
      <table class="skills-table">
       
          <tr v-for="(skill, index) in latestSkills" :key="index" class="skill-row">
            
            <td>{{ formatDate(skill.date) }}</td>
            <td>{{ skill.name }}</td>
            <td>{{ skill.score }}/5</td>
            <td>{{ skill.comment }}</td>
            <td class="user-col">
              <div class="user-photo">
                <img :src="skill.userPhoto || '/api/placeholder/40/40'" alt="User photo" class="user-img" />     <!--wela <img src='../assets/vue.svg' alt="Photo utilisateur" class="user-img" /> -->
              </div>
              <div class="user-name">{{ skill.userName }}</div>
            </td>
          </tr>
       
      </table>
    </div>
  </template>
  <script setup>
  import { useRouter } from 'vue-router'
  import { computed } from 'vue'
  
  const router = useRouter()
  
  const onViewMore = () => {
    router.push({ name: 'History' }) 
  }
  const skills = [
    { date:'2025-02-12', name: 'Adaptability', score: 4.9, comment: 'Shows great flexibility in handling changes', userName: 'Jean Dupont', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-02-12').getTime() },
    { date:'2025-03-01', name: 'Analysis', score: 4.9, comment:'Excellent problem-solving skills', userName: 'Marie Martin', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-03-01').getTime() },
    { date:'2025-03-15', name: 'Teamwork', score: 4.9, comment:'Great team player and collaborator', userName: 'Thomas Bernard', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-03-15').getTime() },
    { date:'2025-03-20', name: 'Organization', score: 4.9, comment:'Well-organized and efficient', userName: 'Léa Petit', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-03-20').getTime() },
    { date:'2025-03-25', name: 'Adaptability', score: 4.9, comment: 'Quick to adapt to new situations', userName: 'Paul Durand', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-03-25').getTime() },
    { date:'2025-04-01', name: 'Analysis', score: 4.9, comment:'Strong analytical thinking', userName: 'Sophie Laurent', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-04-01').getTime() },
    { date:'2025-04-05', name: 'Teamwork', score: 4.9, comment:'Excellent collaboration skills', userName: 'Marc Robert', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-04-05').getTime() },
    { date:'2025-04-10', name: 'Organization', score: 4.9, comment:'Very well organized', userName: 'Julie Blanc', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-04-10').getTime() }, 
    { date:'2025-04-15', name: 'Analysis', score: 4.9, comment:'Great problem-solving abilities', userName: 'Lucas Moreau', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-04-15').getTime() },
    { date:'2025-04-20', name: 'Teamwork', score: 4.9, comment:'Works well in team settings', userName: 'Emma Richard', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-04-20').getTime() },
    { date:'2025-04-25', name: 'Organization', score: 4.9, comment:'Highly organized and efficient', userName: 'Nicolas Simon', userPhoto: '/api/placeholder/40/40', timestamp: new Date('2025-04-25').getTime() },
  ];
  
  const latestSkills = computed(() => {
    return [...skills]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 3)
  })

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  </script>
  <style>
  .table-container {
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
  .skills-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 15px; /* This creates space between rows */
  }
  .skills-table th {
    background-color: #F6F8FF;
    padding: 12px;
    text-align: left;
    font-weight: bold;
  }
  .skill-row {
    background-color: #F6F8FF; /* Light cyan color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .skills-table td {
    padding: 15px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .skills-table td:first-child {
    border-left: 1px solid #ddd;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .skills-table td:last-child {
    border-right: 1px solid #ddd;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .user-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;
  }
  .user-photo {
    margin-bottom: 5px;
  }
  .user-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
  .user-name {
    font-size: 12px;
    text-align: center;
    max-width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } 
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  
  
  .header h1 {
    margin: 0;
  }
  
  .view-more {
    background: none;
    border: none;
    color: #6366F1;
    font-size: 0.9rem;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
  }
  
  .view-more:hover {
    opacity: 0.8;
  }
  </style>