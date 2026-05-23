pipeline {
    agent { label 'agent-01' }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/SachinRao033/Full-Stack-Deployment.git'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'sudo docker compose down || true'
            }
        }

        stage('Build Containers') {
            steps {
                sh 'sudo docker compose build --no-cache'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'sudo docker compose up -d'
            }
        }

        stage('Verify Containers') {
            steps {
                sh 'sudo docker ps'
            }
        }
    }
}
