pipeline {
  agent any

  environment {
    DOCKER_BUILDKIT = 1
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/MariaFernandaFernandez/nuevo_backend_bloc-de-notas.git'
      }
    }

    stage('Limpiar contenedor previo') {
      steps {
        bat 'docker rm -f bloc-notas-backend || echo "No se encontró contenedor previo"'
      }
    }

    stage('Construir y levantar contenedor') {
      steps {
        bat 'docker-compose up -d --build'
      }
    }

    stage('Esperar backend') {
      steps {
        echo 'Esperando 10 segundos para que arranque el backend...'
        bat 'ping 127.0.0.1 -n 10 >nul'
        bat 'curl -X GET http://localhost:3000 || echo Backend no responde'
      }
    }

    stage('Ejecutar pruebas') {
      steps {
        bat '''
          cd backend
          npm install
          npm test
        '''
      }
    }
  }

  post {
    always {
      echo 'Finalizando ejecución'
      bat 'docker-compose down || echo "No se pudo apagar contenedores"'
    }
  }
}
