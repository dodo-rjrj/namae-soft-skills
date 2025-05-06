<template>
  <div class="statistiques-container">
    <h1 class="statistiques-title">Statistiques & Rapports</h1>
    
    <!-- Filtres -->
    <div class="filtres-card">
      <div class="filtres-content">
        <div class="filtres-row">
          <div class="filtre-group">
            <div class="filtre-label">Par projets</div>
            <div class="dropdown">
              <button class="dropdown-btn" @click="toggleDropdown('projets')">
                {{ selectedFilters.projet || 'Tous les projets' }} <span class="dropdown-arrow">▼</span>
              </button>
              <div class="dropdown-content" v-if="openDropdown === 'projets'">
                <div class="dropdown-item" @click="selectFilter('projet', null)">Tous les projets</div>
                <div class="dropdown-item" v-for="projet in projets" :key="projet" @click="selectFilter('projet', projet)">{{ projet }}</div>
              </div>
            </div>
          </div>
          
          <div class="filtre-group">
            <div class="filtre-label">Par periodes</div>
            <div class="dropdown">
              <button class="dropdown-btn date-picker" @click="toggleDropdown('periode')">
                {{ selectedFilters.periode || '01/01/2023-15/04/2025' }} <span class="dropdown-arrow">▼</span>
              </button>
              <div class="dropdown-content" v-if="openDropdown === 'periode'">
                <div class="dropdown-item" @click="selectFilter('periode', '01/01/2023-15/04/2025')">01/01/2023-15/04/2025</div>
                <div class="dropdown-item" @click="selectFilter('periode', '01/01/2024-15/04/2025')">01/01/2024-15/04/2025</div>
                <div class="dropdown-item" @click="selectFilter('periode', '01/01/2025-15/04/2025')">01/01/2025-15/04/2025</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="filtres-row">
          <div class="filtre-group">
            <div class="filtre-label">Par classes</div>
            <div class="dropdown">
              <button class="dropdown-btn" @click="toggleDropdown('classe')">
                {{ selectedFilters.classe || 'Tous les classes' }} <span class="dropdown-arrow">▼</span>
              </button>
              <div class="dropdown-content" v-if="openDropdown === 'classe'">
                <div class="dropdown-item" @click="selectFilter('classe', null)">Tous les classes</div>
                <div class="dropdown-item" v-for="classe in classes" :key="classe" @click="selectFilter('classe', classe)">{{ classe }}</div>
              </div>
            </div>
          </div>
          
          <div class="filtre-group">
            <div class="filtre-label">Par competances</div>
            <div class="dropdown">
              <button class="dropdown-btn" @click="toggleDropdown('competance')">
                {{ selectedFilters.competance || 'Tous les competances' }} <span class="dropdown-arrow">▼</span>
              </button>
              <div class="dropdown-content" v-if="openDropdown === 'competance'">
                <div class="dropdown-item" @click="selectFilter('competance', null)">Tous les competances</div>
                <div class="dropdown-item" v-for="competance in competances" :key="competance" @click="selectFilter('competance', competance)">{{ competance }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="button-group">
          <button class="btn primary-btn" @click="afficherGraphiques">Appliquer</button>
          <button class="btn secondary-btn" @click="reinitialiser">Reinitialiser</button>
        </div>
      </div>
    </div>
    
    <!-- Graphiques - Conditionnellement rendus -->
    <div v-if="montrerGraphiques">
      <!-- Graphiques -->
      <div class="charts-container">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Moyennes par competence</h3>
            <p class="chart-subtitle">Moyenne des scores par compétence pour le groupe sélectionné</p>
          </div>
          <div class="chart-toggle">
            <button class="toggle-btn" :class="{ active: activeToggle === 'median' }" @click="activeToggle = 'median'">Médiane</button>
            <button class="toggle-btn" :class="{ active: activeToggle === 'ecart' }" @click="activeToggle = 'ecart'">Ecart-type</button>
          </div>
          <!-- Version simplifiée - utilise des divs de simulation -->
          <div class="chart-simulation bar-chart">
            <div class="bar-container">
              <div class="bar-group" v-for="(item, index) in matieresData" :key="index">
                <div class="bar-label">{{ item.label }}</div>
                <div class="bar-wrapper">
                  <div class="bar your-average" :style="{ height: (item.yourAvg * 60) + 'px' }"></div>
                  <div class="bar group-average" :style="{ height: (item.groupAvg * 60) + 'px' }"></div>
                </div>
              </div>
            </div>
            <div class="axis-y">
              <div class="tick" v-for="n in 5" :key="n">{{ 4 - (n-1) }}</div>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color pink"></div>
              <div class="legend-text">pour votre moyenne</div>
            </div>
            <div class="legend-item">
              <div class="legend-color blue"></div>
              <div class="legend-text">score moyen de ce groupe</div>
            </div>
          </div>
        </div>
        
        <div class="chart-card">
          <div class="chart-header">
            <h3>Distribution des scores</h3>
            <p class="chart-subtitle">Répartition des scores par compétence</p>
          </div>
          <!-- Version simplifiée - utilise une image de simulation -->
          <div class="chart-simulation radar-chart">
            <div class="radar-placeholder">
              <svg viewBox="0 0 200 200" width="100%" height="200">
                <!-- Lignes grille radar -->
                <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="#ccc" />
                <polygon points="100,40 160,100 100,160 40,100" fill="none" stroke="#ccc" />
                <polygon points="100,60 140,100 100,140 60,100" fill="none" stroke="#ccc" />
                <polygon points="100,80 120,100 100,120 80,100" fill="none" stroke="#ccc" />
                
                <!-- Axes -->
                <line x1="100" y1="0" x2="100" y2="200" stroke="#ccc" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="#ccc" />
                <line x1="30" y1="30" x2="170" y2="170" stroke="#ccc" />
                <line x1="30" y1="170" x2="170" y2="30" stroke="#ccc" />
                
                <!-- Points de données -->
                <polygon points="100,40 160,90 120,170 50,150 60,60" fill="rgba(255,182,193,0.3)" stroke="rgba(255,182,193,1)" stroke-width="2" />
                
                <!-- Labels -->
                <text x="100" y="10" text-anchor="middle" font-size="8">Hab 1</text>
                <text x="190" y="100" text-anchor="start" font-size="8">Hab 2</text>
                <text x="100" y="195" text-anchor="middle" font-size="8">Hab 3</text>
                <text x="10" y="100" text-anchor="end" font-size="8">Hab 4</text>
                <text x="40" y="40" text-anchor="middle" font-size="8">Hab 5</text>
                <text x="160" y="40" text-anchor="middle" font-size="8">Hab 6</text>
              </svg>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color pink"></div>
              <div class="legend-text">moyens</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Graphique d'évolution -->
      <div class="chart-card evolution-card">
        <div class="chart-header">
          <h3>Evolution des competences</h3>
          <p class="chart-subtitle">Progression des scores sur le temps</p>
        </div>
        <!-- Version simplifiée - représentation du graphique en ligne -->
        <div class="chart-simulation line-chart">
          <div class="line-chart-container">
            <svg viewBox="0 0 600 250" width="100%" height="250">
              <!-- Grille de fond -->
              <line x1="50" y1="0" x2="50" y2="200" stroke="#ccc" />
              <line x1="50" y1="0" x2="50" y2="200" stroke="#ccc" />
              <line x1="50" y1="50" x2="600" y2="50" stroke="#ccc" />
              <line x1="50" y1="100" x2="600" y2="100" stroke="#ccc" />
              <line x1="50" y1="150" x2="600" y2="150" stroke="#ccc" />
              <line x1="50" y1="200" x2="600" y2="200" stroke="#ccc" />
              
              <!-- Axes -->
              <line x1="50" y1="200" x2="600" y2="200" stroke="#333" />
              <line x1="50" y1="0" x2="50" y2="200" stroke="#333" />
              
              <!-- Ligne jaune -->
              <path d="M 80 180 L 150 50 L 230 100 L 310 120 L 390 150 L 470 170 L 550 90" fill="none" stroke="rgba(255, 206, 86, 1)" stroke-width="3" />
              <circle cx="80" cy="180" r="4" fill="rgba(255, 206, 86, 1)" />
              <circle cx="150" cy="50" r="4" fill="rgba(255, 206, 86, 1)" />
              <circle cx="230" cy="100" r="4" fill="rgba(255, 206, 86, 1)" />
              <circle cx="310" cy="120" r="4" fill="rgba(255, 206, 86, 1)" />
              <circle cx="390" cy="150" r="4" fill="rgba(255, 206, 86, 1)" />
              <circle cx="470" cy="170" r="4" fill="rgba(255, 206, 86, 1)" />
              <circle cx="550" cy="90" r="4" fill="rgba(255, 206, 86, 1)" />
              
              <!-- Ligne violette -->
              <path d="M 80 190 L 150 170 L 230 175 L 310 170 L 390 160 L 470 170 L 550 120" fill="none" stroke="rgba(153, 102, 255, 1)" stroke-width="3" />
              <circle cx="80" cy="190" r="4" fill="rgba(153, 102, 255, 1)" />
              <circle cx="150" cy="170" r="4" fill="rgba(153, 102, 255, 1)" />
              <circle cx="230" cy="175" r="4" fill="rgba(153, 102, 255, 1)" />
              <circle cx="310" cy="170" r="4" fill="rgba(153, 102, 255, 1)" />
              <circle cx="390" cy="160" r="4" fill="rgba(153, 102, 255, 1)" />
              <circle cx="470" cy="170" r="4" fill="rgba(153, 102, 255, 1)" />
              <circle cx="550" cy="120" r="4" fill="rgba(153, 102, 255, 1)" />
              
              <!-- Labels axe X -->
              <text x="80" y="225" text-anchor="middle" font-size="12">January</text>
              <text x="150" y="225" text-anchor="middle" font-size="12">February</text>
              <text x="230" y="225" text-anchor="middle" font-size="12">March</text>
              <text x="310" y="225" text-anchor="middle" font-size="12">April</text>
              <text x="390" y="225" text-anchor="middle" font-size="12">May</text>
              <text x="470" y="225" text-anchor="middle" font-size="12">June</text>
              <text x="550" y="225" text-anchor="middle" font-size="12">July</text>
              
              <!-- Labels axe Y -->
              <text x="35" y="200" text-anchor="end" font-size="12">0</text>
              <text x="35" y="150" text-anchor="end" font-size="12">1</text>
              <text x="35" y="100" text-anchor="end" font-size="12">2</text>
              <text x="35" y="50" text-anchor="end" font-size="12">3</text>
              <text x="35" y="10" text-anchor="end" font-size="12">4</text>
            </svg>
          </div>
        </div>
        <div class="chart-legend horizontal">
          <div class="legend-item">
            <div class="legend-color yellow"></div>
            <div class="legend-text">Hab 1</div>
          </div>
          <div class="legend-item">
            <div class="legend-color purple"></div>
            <div class="legend-text">Hab 2</div>
          </div>
        </div>
      </div>
      
      <!-- Bouton de génération de rapport -->
      <div class="rapport-button">
        <button class="btn secondary-btn" @click="toggleRapportDropdown">
          Générer un rapport <span class="dropdown-arrow">▼</span>
        </button>
        <div class="rapport-dropdown" v-if="showRapportOptions">
          <div class="rapport-option" @click="genererRapport('pdf')">Exporter en PDF</div>
          <div class="rapport-option" @click="genererRapport('excel')">Exporter en Excel</div>
          <div class="rapport-option" @click="genererRapport('print')">Imprimer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatistiquesRapports',
  data() {
    return {
      montrerGraphiques: false, // Par défaut, les graphiques sont masqués
      openDropdown: null, // Pour suivre quel dropdown est ouvert
      showRapportOptions: false, // Pour afficher/masquer les options de rapport
      activeToggle: 'median', // Pour le toggle button actif
      
      // Options pour les dropdowns
      projets: ['Java', 'dev web', 'C++', 'Python'],
      classes: ['AP2', 'GINF1', 'GINF2', 'GINF3'],
      competances: ['Communication', 'leadership', 'Empathie', 'Créativité', 'Adaptabilité', 'Autogestion', 'Négociation'],
      
      // Pour stocker les filtres sélectionnés
      selectedFilters: {
        projet: null,
        periode: '01/01/2023-15/04/2025',
        classe: null,
        competance: null
      },
      
      matieresData: [
        { label: 'Communication', yourAvg: 2.5, groupAvg: 2.3 },
        { label: 'leadership', yourAvg: 3.2, groupAvg: 2.8 },
        { label: 'Empathie', yourAvg: 2.1, groupAvg: 3.5 },
        { label: 'Créativité', yourAvg: 1.8, groupAvg: 2.2 },
        { label: 'Adaptabilité', yourAvg: 3.6, groupAvg: 2.7 },
        { label: 'Autogestion', yourAvg: 3.0, groupAvg: 2.5 },
        { label: 'Négociation', yourAvg: 2.4, groupAvg: 2.1 }
      ]
    }
  },
  methods: {
    // Gestion des filtres
    toggleDropdown(dropdown) {
      if (this.openDropdown === dropdown) {
        this.openDropdown = null; // Fermer le dropdown s'il est déjà ouvert
      } else {
        this.openDropdown = dropdown; // Ouvrir le dropdown sélectionné
      }
    },
    
    selectFilter(type, value) {
      this.selectedFilters[type] = value;
      this.openDropdown = null; // Fermer le dropdown après la sélection
    },
    
    // Affichage/masquage des graphiques
    afficherGraphiques() {
      this.montrerGraphiques = true;
      this.openDropdown = null; // Fermer tout dropdown ouvert
    },
    
    reinitialiser() {
      this.montrerGraphiques = false;
      this.selectedFilters = {
        projet: null,
        periode: '01/01/2023-15/04/2025',
        classe: null,
        competance: null
      };
      this.openDropdown = null;
    },
    
    // Gestion du menu de rapport
    toggleRapportDropdown() {
      this.showRapportOptions = !this.showRapportOptions;
    },
    
    genererRapport(type) {
      alert(`Génération d'un rapport de type: ${type}`);
      this.showRapportOptions = false;
    }
  },
  // Fermer les dropdowns si on clique ailleurs
  mounted() {
    document.addEventListener('click', (e) => {
      // Vérifier si le clic est en dehors des dropdowns
      const dropdowns = document.querySelectorAll('.dropdown');
      let clickedOutside = true;
      
      dropdowns.forEach(dropdown => {
        if (dropdown.contains(e.target)) {
          clickedOutside = false;
        }
      });
      
      // Vérifier aussi pour le dropdown de rapport
      const rapportBtn = document.querySelector('.rapport-button');
      if (rapportBtn && rapportBtn.contains(e.target)) {
        clickedOutside = false;
      }
      
      if (clickedOutside) {
        this.openDropdown = null;
        this.showRapportOptions = false;
      }
    });
  }
}
</script>

<style>
.statistiques-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.statistiques-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Styles pour la carte des filtres */
.filtres-card {
  background-color: #dbeafe;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #e0e0e0;
}

.filtres-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filtres-row {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.filtre-group {
  display: flex;
  flex-direction: column;
  width: 48%;
  position: relative;
}

.filtre-label {
  color: #2d56f7;
  font-size: 14px;
  margin-bottom: 8px;
}

.dropdown {
  position: relative;
}

.dropdown-btn {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 8px 15px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-arrow {
  font-size: 12px;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-top: 2px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 8px 15px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.date-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  border: none;
}

.primary-btn {
  background-color: #3355e0;
  color: white;
}

.secondary-btn {
  background-color: #fff;
  border: 1px solid #3355e0;
  color: #3355e0;
}

/* Styles pour les cartes de graphiques */
.charts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid #e0e0e0;
}

.evolution-card {
  margin-bottom: 30px;
}

.chart-header {
  margin-bottom: 15px;
}

.chart-header h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.chart-subtitle {
  color: #666;
  font-size: 12px;
  margin: 0;
}

.chart-toggle {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.toggle-btn {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 5px 15px;
  font-size: 12px;
  cursor: pointer;
}

.toggle-btn.active {
  background-color: #3355e0;
  color: white;
  border-color: #3355e0;
}

/* Styles pour les graphiques simulés */
.chart-simulation {
  height: 250px;
  position: relative;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 5px;
}

.bar-chart {
  display: flex;
  position: relative;
  padding-bottom: 20px;
}

.bar-container {
  display: flex;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  padding-left: 30px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 240px;
  padding-top: 10px;
}

.bar-label {
  position: absolute;
  bottom: 0;
  font-size: 10px;
  transform: rotate(-45deg);
  transform-origin: left top;
  margin-top: 10px;
}

.bar-wrapper {
  display: flex;
  gap: 4px;
  align-items: flex-end;
  height: 100%;
}

.bar {
  width: 15px;
  border-radius: 3px 3px 0 0;
}

.your-average {
  background-color: rgba(255, 182, 193, 0.7);
}

.group-average {
  background-color: rgba(173, 216, 230, 0.7);
}

.axis-y {
  position: absolute;
  left: 10px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tick {
  font-size: 10px;
}

.radar-chart, .line-chart {
  display: flex;
  justify-content: center;
  align-items: center;
}

.radar-placeholder {
  width: 80%;
  height: 80%;
}

.chart-legend {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.horizontal {
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #666;
}

.legend-color {
  width: 15px;
  height: 15px;
  border-radius: 3px;
}

.legend-color.pink {
  background-color: rgba(255, 182, 193, 1);
}

.legend-color.blue {
  background-color: rgba(173, 216, 230, 1);
}

.legend-color.yellow {
  background-color: rgba(255, 206, 86, 1);
}

.legend-color.purple {
  background-color: rgba(153, 102, 255, 1);
}

.rapport-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  position: relative;
}

.rapport-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-top: 5px;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.rapport-option {
  padding: 10px 15px;
  cursor: pointer;
}

.rapport-option:hover {
  background-color: #f5f5f5;
}
</style>