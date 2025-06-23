pipeline {
  agent any

  /*environment {
    DOCKER_BUILDKIT = 1
  }*/

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/pr0317/pruebas_jenkins.git'
      }
    }

    stage('Limpiar contenedor previo') {
      steps {
        sh 'docker rm -f bloc-notas-backend || echo "No se encontró contenedor previo"'
      }
    }

    stage('Construir y levantar contenedor') {
      steps {
        sh 'docker-compose up -d --build'
      }
    }

    stage('Esperar backend') {
      steps {
        echo 'Esperando 10 segundos para que arranque el backend...'
        sh '''
          sleep 10
          curl -X GET http://localhost:3000 || echo "⚠️ Backend no responde"
        '''
      }
    }

stage('Ejecutar pruebas') {
  steps {
    withCredentials([string(credentialsId: 'SUDO_PASS', variable: 'PASS')]) {
      sh '''#!/bin/bash
        set -e
        cd backend
        echo "$PASS" | tr -d '\\r\\n' | sudo -S npm install
        echo "$PASS" | tr -d '\\r\\n' | sudo -S npm test
      '''
    }
  }
}

  }

  post {
    always {
      echo 'Finalizando ejecución'
      sh 'docker-compose down || echo "No se pudo apagar contenedores"'
    }
  }
}