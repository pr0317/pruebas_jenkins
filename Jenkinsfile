pipeline {
    agent any

    environment {
        BACKEND_CONTAINER = 'bloc-notas-backend'
    }

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
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
                bat 'timeout /t 10 > nul'
                bat 'docker exec bloc-notas-backend curl -s http://localhost:3000 || echo Backend no responde'
            }
        }

        stage('Detener contenedor') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                bat 'docker stop bloc-notas-backend'
            }
        }
    }
}
// Cambio de prueba para confirmar subida a GitHub

