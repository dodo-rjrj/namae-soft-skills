<template>
    <div class="history-container">
      <strong>Historique des évaluations</strong>
      
      <div class="filters">
        <div class="filter-group">
          <label for="period">Période</label>
          <div class="select-wrapper">
            <select id="period" v-model="selectedPeriod">
              <option value="all">Tous</option>
              <option value="month">Dernier mois</option>
              <option value="trimester">Dernier trimestre</option>
            </select>
            <span class="arrow-down">▼</span>
          </div>
        </div>
        
        <div class="filter-group">
          <label for="project">Projet</label>
          <div class="select-wrapper">
            <select id="project" v-model="selectedProject">
              <option value="all">Tous</option>
              <option value="project1">Projet 1</option>
              <option value="project2">Projet 2</option>
            </select>
            <span class="arrow-down">▼</span>
          </div>
        </div>
        
        <button class="filter-button">FILTRER</button>
      </div>
      
      <div class="table-container">
        <table class="skills-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Skills</th>
              <th>Score</th>
              <th>Comment</th>
              <th>Évaluateur</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(evaluation, index) in evaluations" :key="index" class="skill-row">
              <td>{{ evaluation.date }}</td>
              <td>{{ evaluation.skill }}</td>
              <td>{{ evaluation.score }}</td>
              <td>{{ evaluation.comment }}</td>
              <td class="user-col">
                <div class="user-photo">
                  <img :src="evaluation.evaluatorPhoto" alt="Evaluator Photo" class="user-img" />
                </div>
                <div class="user-name">{{ evaluation.evaluatorName }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedPeriod = ref('all');
  const selectedProject = ref('all');
  
  const evaluations = ref([
    {
      date: '4/09/24',
      skill: 'Teamwork',
      score: 4.9,
      comment: 'Concise and confident speaker',
      evaluatorName: 'Etu Amina',
      evaluatorPhoto: '/api/placeholder/40/40'
    },
    {
      date: '3/27/24',
      skill: 'Problem Solving',
      score: 4.9,
      comment: 'Active listener in team talks',
      evaluatorName: 'Prof Amal',
      evaluatorPhoto: '/api/placeholder/40/40'
    },
    {
      date: '4/10/24',
      skill: 'Communication',
      score: 4.9,
      comment: 'Clearly expresses ideas.',
      evaluatorName: 'Prof ALGHAILANI',
      evaluatorPhoto: '/api/placeholder/40/40'
    },
    {
      date: '4/09/24',
      skill: 'Teamwork',
      score: 4.9,
      comment: 'Concise and confident speaker',
      evaluatorName: 'Etu Amina',
      evaluatorPhoto: '/api/placeholder/40/40'
    },
    {
      date: '3/27/24',
      skill: 'Problem Solving',
      score: 4.9,
      comment: 'Active listener in team talks',
      evaluatorName: 'Prof Amal',
      evaluatorPhoto: '/api/placeholder/40/40'
    },
    {
      date: '4/10/24',
      skill: 'Communication',
      score: 4.9,
      comment: 'Clearly expresses ideas.',
      evaluatorName: 'Prof ALGHAILANI',
      evaluatorPhoto: '/api/placeholder/40/40'
    },
    {
      date: '4/09/24',
      skill: 'Teamwork',
      score: 4.9,
      comment: 'Concise and confident speaker',
      evaluatorName: 'Etu Amina',
      evaluatorPhoto: '/api/placeholder/40/40'
    },
    {
      date: '3/27/24',
      skill: 'Problem Solving',
      score: 4.9,
      comment: 'Active listener in team talks',
      evaluatorName: 'Prof Amal',
      evaluatorPhoto: '/api/placeholder/40/40'
    }
  ]);
  </script>
  
  <style scoped>
  .history-container {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 2px 10px rgba(38, 37, 37, 0.4);
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }
  
  .filters {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  label {
    font-size: 14px;
    color: #666;
  }
  
  .select-wrapper {
    position: relative;
  }
  
  select {
    padding: 8px 30px 8px 10px;
    border: 1px solid #9c6ab8;
    border-radius: 5px;
    appearance: none;
    width: 150px;
    background: transparent;
  }
  
  .arrow-down {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: #27397f;
    pointer-events: none;
  }
  
  .filter-button {
    margin-left: auto;
    align-self: flex-end;
    padding: 8px 20px;
    background-color: #2e75b6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .table-container {
    padding: 20px;
    overflow-x: auto;
  }
  
  .skills-table {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
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
    
  }
  
  .skills-table td {
    padding: 15px;
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
  strong{
    font-size: 30px;
    margin-bottom: 12px;
  }
  </style>